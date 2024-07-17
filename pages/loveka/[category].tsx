import { useSearchParams } from 'next/navigation'
import { LovekaHeading } from '.'
import Header from '../../components/Header'

export default function Index() {
    const searchParams = useSearchParams()

    return <div className='p-4'>
        <LovekaHeading text="Loveka" />
        <p className='text-sky-500'>{JSON.stringify(searchParams.get('value'))}</p>
    </div>
}