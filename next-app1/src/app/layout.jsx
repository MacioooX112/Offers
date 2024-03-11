import '../../styles/globals.css';
import '../../styles/App.css';
import '../../styles/myStyles.css';
import Nav from './components/Nav';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;


const layout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <div className='main'>
                <div className='gradient'/>
            </div>
            <main className='app'>
                <Nav/>
                {children}
            </main>
        </body>
    </html>
  )
}

export default layout