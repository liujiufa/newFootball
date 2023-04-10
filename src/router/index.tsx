import React, { Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import PageLoding from '../components/PageLoding';
import MainLayout from "../Layout/MainLayout";
import DeputyLayout from "../Layout/DeputyLayout";
const Home = React.lazy(() => import('../view/Home'));
const BlindBox = React.lazy(() => import('../view/BlindBox'));
const Swap = React.lazy(() => import('../view/Swap'));
const NFT = React.lazy(() => import('../view/NFT'));
const Pledge = React.lazy(() => import('../view/Pledge'));
const Land = React.lazy(() => import('../view/Land'));
const SBL = React.lazy(() => import('../view/Node'));
const DestructFund = React.lazy(() => import('../view/DestructFund'));
const Liquidity = React.lazy(() => import('../view/Liquidity'));
const MBASwap = React.lazy(() => import('../view/MBASwap'));
const Farms = React.lazy(() => import('../view/farms'));
const Invitation = React.lazy(() => import('../view/Invitation'));
const NodeApply = React.lazy(() => import('../view/NodeApply'));
const Notice = React.lazy(() => import('../view/Notice'));
const NodeFund = React.lazy(() => import('../view/NodeFund'));
const CreateNode = React.lazy(() => import('../view/CreateNode'));
const Synthesis = React.lazy(() => import('../view/Synthesis'));
const Announcement = React.lazy(() => import('../view/Announcement'));
const WhiteList = React.lazy(() => import('../view/WhiteList'));
export default function Router() {
  return (
    <Suspense fallback={<PageLoding></PageLoding>}>
      <Routes>
        <Route path="/*" element={<MainLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="BlindBox" element={<BlindBox />}></Route>
          <Route path="Swap" element={<Swap />}></Route>
          <Route path="NFT" element={<NFT />}></Route>
          <Route path="Pledge" element={<Pledge />}></Route>
          <Route path="Land" element={<Land />}></Route>
          <Route path="Node" element={<SBL />}></Route>
          <Route path="DestructFund" element={<DestructFund />}></Route>
          <Route path="Liquidity" element={<Liquidity />}></Route>
          <Route path="MBASwap" element={<MBASwap />}></Route>
          {/* <Route path="Farms" element={<Farms />}></Route> */}
          <Route path="Invitation" element={<Invitation />}></Route>
          <Route path="NodeApply" element={<NodeApply />}></Route>
          <Route path="Notice" element={<Notice />}></Route>
          <Route path="NodeFund" element={<NodeFund />}></Route>
          <Route path="CreateNode" element={<CreateNode />}></Route>
          <Route path="Synthesis" element={<Synthesis />}></Route>
          <Route path="Announcement" element={<Announcement />}></Route>
          <Route path="WhiteList" element={<WhiteList />}></Route>
        </Route>
        <Route path="/DeputyLayout" element={<DeputyLayout />}>
        </Route>
      </Routes>
    </Suspense>
  )
}
