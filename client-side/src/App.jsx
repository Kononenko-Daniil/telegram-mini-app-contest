import WebApp from '@twa-dev/sdk'

function App() {
    const handleClick = () => {
        WebApp.showPopup({
            title: "Hello", 
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            buttons: [
                {
                    id: "OK-button",
                    type: "ok",
                },
                {
                    id: "CLOSE-button",
                    type: "close"
                }
            ]
        }, (id) => {console.log(id)});
    }

    return (
        <div style={{flexDirection: "column", display: "flex", padding: "5px"}}>
            <button className="regular primary" onClick={handleClick}>Hello</button>
            <button className="regular primary-tinned" onClick={handleClick}>Hello</button>
            <button className="regular danger" onClick={handleClick}>Hello</button>
            <button className="regular danger-tinned" onClick={handleClick}>Hello</button>
            <button className="regular success" onClick={handleClick}>Hello</button>
            <button className="regular success-tinned" onClick={handleClick}>Hello</button>

            <button className="regular success-tinned sm" onClick={handleClick}>Hello</button>

            <h1>Hello</h1>
            <div className="divider" />
            <div className='tag primary'>H/W</div>
            <p>Hint color is good</p>
            <a href="/">Hello link</a>

            <div className='avatar sm'>😀</div>
            <div className='avatar md'>😱</div>
            <div className='avatar lg'>👨‍🏫</div>
        </div>
    )
}

export default App
