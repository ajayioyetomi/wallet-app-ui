import { createContext, useEffect, useState, type ReactNode} from 'react';
import { createPortal } from 'react-dom';


type PopUpType = {
    open: boolean,
    setOpen: (arg:boolean)=> boolean,
    setPopUp: (arg:ReactNode)=> ReactNode
}
type PopUpChildren = {
    children: ReactNode
}
export const PopUpContext = createContext<PopUpType>({
    open: false,
    setOpen: (arg:boolean)=> arg,
    setPopUp: () => <></>
})
const popup_root = document.getElementById('pop-up-root')!;
const PopUpProvider = ({children}: PopUpChildren) => {
  const [open, set_open] = useState<boolean>(false);
  const [popup, set_pop_up] = useState<ReactNode>(<></>);
	const [screen_width, set_screen_width] = useState<number>(window.innerWidth)
  const setOpen = (open:boolean) =>{
    
    let root = document.getElementById('pop-up-root');
    if(open && root){
        root.setAttribute('open','')
    }
    else popup_root.removeAttribute('open');
    set_open(open);
    return open;
  }
  const setPopUp = (popup:ReactNode) =>{
    set_pop_up(popup)
    return popup;
  }
	const closePopUp = () =>{
		setPopUp(<></>)
    setOpen(false);
	}

  const value:PopUpType = {
    open,
    setOpen,
    setPopUp
  }
	useEffect(()=>{
		const handleKeyboardEscape = (e: KeyboardEvent) =>{
				let key = e.key;
				if(key === 'Escape' || key === 'escape'){
						setPopUp(<></>)
						setOpen(false);
				}
		}
		window.addEventListener('keydown',handleKeyboardEscape)
		return ()=> window.removeEventListener('keydown',handleKeyboardEscape)
	})
	useEffect(()=>{
		const handleScreenWidth = () =>{
			const width = window.innerWidth;
			set_screen_width(width);
		}
		handleScreenWidth();
		window.addEventListener('resize',handleScreenWidth);
		return () => window.removeEventListener('resize',handleScreenWidth);
	},[])
  return (
    <PopUpContext.Provider value={value}>
        {children}
        {
            createPortal(
                <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-end sm:items-center '>
                    <span onClick={closePopUp} className='absolute top-0 left-0 z-2 w-screen h-screen bg-black opacity-90'></span>
                  { open ? <div className={`z-3 w-[fit-content] h-[fit-content] origin-center ${screen_width <= 500 ? 'animate-popup-m':'animate-popup-d'}`}>
                        {popup}
                    </div> :
										<></>
									}
                </div>,
                popup_root
            )
        }
        
    </PopUpContext.Provider>
  )
}

export default PopUpProvider