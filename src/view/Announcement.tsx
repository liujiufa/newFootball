import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import Item from 'antd/lib/descriptions/Item';
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import ReactQuill from 'react-quill';


import "../assets/style/Announcement.scss";

import 'react-quill/dist/quill.snow.css';
import { deleteNoticeList, getNoticeList, updateNoticeList } from '../API';
import { Contracts } from '../web3';
import { useWeb3React } from '@web3-react/core';

interface Item {
    key: string | number;
    content: string;
    createTime: string | number;
    id: string | number;
    status: string | number;
    msg?: string | null;
    sign?: string | null;
    title?: string | null
    userAddress?: string | null
    isAdd?: boolean
}

const originData: Item[] = [];

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
}

interface UpdateNoticeListType {
    content: string;
    id?: string | number | null;
    sign?: string | null;
    msg?: string | null;
    title?: string | null
    userAddress?: string | null
}

const INIT_NOTICE = {
    key: "",
    content: "",
    createTime: "",
    id: "",
    status: "",
    msg: "",
    sign: "",
    title: "",
    userAddress: "",
    isAdd: true
}


const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    ...restProps
}) => {
    const [value, setValue] = useState('');

    const inputNode = <ReactQuill key={record?.key} theme="snow" value={value} onChange={setValue} />;

    return (
        <td {...restProps}>
            {editing || !!record?.isAdd ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};


export default function Announcement() {
    const web3React = useWeb3React();
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [announcementOption, setAnnouncementOption] = useState<Item>(INIT_NOTICE);

    const [isAdd, setIsAdd] = useState(false);
    const [editingKey, setEditingKey] = useState<string | number>('');

    const isEditing = (record: Item) => record.key === editingKey;

    const sign = async () => {
        let time = (new Date()).valueOf();
        const signStr = await Contracts.example.Sign(web3React.account as string, `userAddress=${web3React.account}&time=${time}`)

        return ({
            msg: `userAddress=${web3React.account}&time=${time}`,
            signStr
        })
    }

    const edit = (record: Item) => {
        setAnnouncementOption(record)
        form.setFieldsValue({ name: '', age: '', address: '', ...record });
        setEditingKey(record.key);
    };

    const cancel = (record: Partial<Item>) => {
        if (!record?.key && record?.isAdd) {
            setData(data.filter((item) => item?.key && !item?.isAdd))
            setIsAdd(false)
        }
        setEditingKey('');
    };

    const deleteCancel = (record: Partial<Item> & { key: React.Key }) => {
        sign().then(({ signStr = "", msg = "" }) => {
            deleteNotice(record.key, signStr, msg)
        })
    };


    const save = async (record: Item) => {
        const row = (await form.validateFields()) as Item;

        try {
            sign().then(res => {
                editNoticeData({
                    id: record.id || "",
                    title: row.title,
                    content: row.content,
                    sign: res.signStr,
                    msg: res.msg,
                    userAddress: web3React.account || ""
                }).then(() => {
                    setIsAdd(false)
                    cancel(record)
                })
            })

        } catch (errInfo) {
            // console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'title',
            dataIndex: 'title',
            width: '25%',
            render: (_: any, record: Item) => {
                return record?.isAdd ? <Form.Item
                    name="title"
                    style={{ margin: 0 }}
                ><Input placeholder='请输入标题' /></Form.Item> : record.title
            }
        },
        {
            title: 'createTime',
            dataIndex: 'createTime',
            width: '15%',
        },
        {
            title: 'content',
            dataIndex: 'content',
            width: '45%',
            editable: true,
            render: (_: any, record: Item) => {
                return <div dangerouslySetInnerHTML={{ __html: record.content }} />
            }
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return <div className='announcement-td-editor'>
                    {
                        editable || record?.isAdd ? (
                            <span>
                                <Typography.Link onClick={() => save(record)} style={{ marginRight: 8 }}>
                                    Save
                                </Typography.Link>
                                <Popconfirm title="Sure to cancel?" onConfirm={() => {
                                    cancel(record)
                                }}>
                                    <a>Cancel</a>
                                </Popconfirm>
                            </span>
                        ) : (
                            <Fragment>
                                <Typography.Link disabled={(editingKey !== '') || isAdd} onClick={() => edit(record)}>
                                    Edit
                                </Typography.Link>
                                <Popconfirm title="Sure to cancel?" onConfirm={() => deleteCancel(record)}>
                                    <a>Delete</a>
                                </Popconfirm>

                            </Fragment>
                        )
                    }
                </div>
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const getNoticeData = useCallback(
        async () => {
            getNoticeList().then((res: any) => {
                if (res.code === 200) {
                    setData(res.data?.map((item: any) => ({ ...item, key: item.id })) || [])
                }
            }).catch((error) => {
                // console.log(error, "ERROR");
            })
        },
        [getNoticeList],
    )

    const editNoticeData = useCallback(
        async (option: UpdateNoticeListType) => {
            updateNoticeList(option).then((res: any) => {
                if (res.code === 200) {
                    getNoticeData()
                }
            })
        },
        [getNoticeList],
    )

    const deleteNotice = useCallback(
        async (id: string | number, sign: string, msg: string) => {
            deleteNoticeList(id, sign, msg, web3React.account || ""
            ).then((res: any) => {
                if (res.code === 200) {
                    getNoticeData()
                }
            })
        },
        [getNoticeList, web3React],
    )


    useEffect(() => {
        getNoticeData()
    }, [])

    return (
        <div id="announcement" className="announcement">

            <div key={data.length} className="announcement-container">
                <div className="announcement-tool">
                    <Button type='primary' onClick={() => {
                        if (!isAdd) {
                            cancel(announcementOption)
                            setIsAdd(true)
                            setTimeout(() => {
                                setData([INIT_NOTICE, ...data])
                            }, 200);
                        }

                    }}>添加</Button>
                </div>
                <Form form={form} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        rowKey={(record) => {
                            return Math.random() + record.key.toString()
                        }}
                        bordered
                        dataSource={data}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{
                            // onChange: cancel,
                        }}
                    />
                </Form>
            </div>
        </div>
    )
}
