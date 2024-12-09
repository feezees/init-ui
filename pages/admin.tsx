import axios from "axios";
import { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen bg-slate-900 w-full text-white">
            <div className="mx-auto w-[100%] max-w-[1440px] p-4 border-2 h-full overflow-y-scroll overflow-x-scroll custom-scrollbar">
                {children}
            </div>
        </div>
    );
};


export default function Admin() {
    const [dtos, setDtos] = useState<string[] | undefined | null>(undefined);
    const [list, setList] = useState<any[]>([]);

    useEffect(() => {
        console.log('#52 list', list)
    }, [list]);

    useEffect(() => {
        console.log('#52 dtos', dtos)
    }, [dtos]);

    useEffect(() => {
        axios.get('/api/admin/jsons')
            .catch(err => setDtos(null))
            .then(res => setDtos(res?.data?.dtos));
    }, []);

    const handleFetchDto = (dto: string) => () => {
        // add query to url
        let techDomen = window.location.origin;
        let url = new URL(techDomen + '/api/admin/jsons');
        url.searchParams.set('dto', dto);
        axios.get(url.href.replace(techDomen, ''))
            .catch(err => setDtos(null))
            .then(res => setList(res?.data?.dtos));
    }

    const typeA = (list: unknown) => {
        console.log('#52 x1', list);
        if (Array.isArray(list) || typeof list !== 'object') {
            return false;
        }

        const item = Object.entries(list as Record<string, unknown>)[0][1];
        return typeof item === 'string' || typeof item === 'number';
    }

    const typeB = (list: unknown) => {
        if (Array.isArray(list) || typeof list !== 'object') {
            return false;
        }

        const item = Object.entries(list as Record<string, unknown>)[0][1];
        if (typeof item !== 'object') {
            return false;
        }

        return true;
    }

    const typeC = (list: unknown) => {
        if (!Array.isArray(list) || list.length === 0) {
            return false;
        }

        return typeof list[0] === 'object';
    }

    return (
        <Layout>
            <p>admin</p>
            {dtos && <div className="flex gap-2">
                {dtos.map(dto => (
                    <button className="border-2 p-2 my-4 cursor-pointer hover:bg-slate-800" key={dto}
                        onClick={handleFetchDto(dto)}
                    >{dto}</button>
                ))}
            </div>}
            {dtos === null && <p>error</p>}

            {typeA(list) &&
                <table className="border-separate border-spacing-2 border border-slate-500">
                    <thead>
                        <tr>
                            <th className="border border-slate-600 p-2">Key</th>
                            <th className="border border-slate-600 p-2">Value</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            list && !Array.isArray(list) && <>
                                {
                                    Object
                                        .entries(list)
                                        .map(([key, value]) => <tr key={key}>
                                            <td className="border border-slate-600 p-2">{key}</td>
                                            <td className="border border-slate-600 p-2">{JSON.stringify(value)}</td>
                                        </tr>)
                                }
                            </>
                        }
                    </tbody>

                </table>
            }

            {typeB(list) &&
                <table className="border-separate border-spacing-2 border border-slate-500">
                    <thead>
                        <tr>
                            <th className="border border-slate-600 p-2">Key</th>
                            {Object.keys(Object.entries(list)[0][1]).map(el => <th className="border border-slate-600 p-2">{el}</th>)}
                        </tr>
                    </thead>

                    <tbody>
                        {Object.entries(list).map(([key, value]) => <tr key={key}>
                            <td className="border border-slate-600 p-2">{key}</td>
                            {Object.entries(value).map(([key, value]) => <td className="border border-slate-600 p-2">{JSON.stringify(value)}</td>)}
                        </tr>)}
                    </tbody>

                </table>}

            {typeC(list) &&
                <table className="border-separate border-spacing-2 border border-slate-500">
                    <thead>
                        <tr>
                            {Object.keys(Object.entries(list)[0][1]).map(el => <th className="border border-slate-600 p-2">{el}</th>)}
                        </tr>
                    </thead>

                    <tbody>
                        {Object.entries(list).map(([key, value]) => <tr key={key}>
                            {Object.entries(value).map(([key, value]) => <td className="border border-slate-600 p-2">{JSON.stringify(value)}</td>)}
                        </tr>)}
                    </tbody>
                </table>}
        </Layout >
    );
}