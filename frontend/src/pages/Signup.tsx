import { Auth } from '../components/Auth'
import { Quote } from '../components/Quote'

const Signup = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2'>
        <div>
            <Auth type='signup'/>
        </div>
        <div className='hidden sm:block'>
            <Quote/>
        </div>
        
    </div>
       
  )
}

export default Signup