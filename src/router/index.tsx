import Home from "@/pages/home/home";
import {createHashRouter, Navigate} from "react-router";
import RecordList from "@/pages/record/components/recordList";
import Record from "@/pages/record/record";
import HelpCenter from "@/pages/helpcenter/helpcenter";
import Production from "@/pages/production/production";
import Balance from "@/pages/balance/balance";

const routes = [
    {path: '/', Component: Home},
    {
        path: '/record',
        Component: Record,
        children: [
            {index: true, element: <Navigate to="passed" replace/>},
            { path: ':type', Component: RecordList },
        ]
    },
    {path: '/helpcenter', Component: HelpCenter},
    {path: '/production', Component: Production},
    { path: '/balance', Component: Balance },
    { path: '*', element: <Navigate to="/" replace/> },
]

export default createHashRouter(routes)

