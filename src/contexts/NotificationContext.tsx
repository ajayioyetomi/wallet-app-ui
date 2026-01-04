import { createContext, useEffect, useState, type ReactNode} from 'react';
import { createPortal } from 'react-dom';

import { Button } from '../components';

type NoticeType = {
	status: 'error' | 'success';
	message: string;
	
}
type NotificationType = {
    open: boolean,
    setOpenNotification: (arg:boolean)=> boolean,
    setNotification: (arg:NoticeType)=> NoticeType
}
type NotificationChildren = {
    children: ReactNode
}
export const NotificationContext = createContext<NotificationType>({
    open: false,
    setOpenNotification: (arg:boolean)=> arg,
    setNotification: (arg:NoticeType) => arg
})
const notification_root = document.getElementById('notification-root')!;
const NotificationProvider = ({children}: NotificationChildren) => {
  const [open, set_open] = useState<boolean>(false);
  const [notification, set_notification] = useState<NoticeType>({status:'success',message:''});
  const setOpenNotification = (open:boolean) =>{
    
    if(open && notification_root){
        notification_root.setAttribute('open','')
    }
    else notification_root.removeAttribute('open');
    set_open(open);
		setTimeout(()=>{set_open(false)},3000)
    return open;
  }
  const setNotification = (notification:NoticeType) =>{
    set_notification(notification)
    return notification;
  }
    const closeNotification = () =>{
      setNotification({status:'success',message:''})
    	setOpenNotification(false);
    }

  const value:NotificationType = {
    open,
    setOpenNotification,
    setNotification
  }
    useEffect(()=>{
        const handleKeyboardEscape = (e: KeyboardEvent) =>{
					let key = e.key;
					if(key === 'Escape' || key === 'escape'){
							setNotification({status:'success', message:''})
							setOpenNotification(false);
					}
        }
        window.addEventListener('keydown',handleKeyboardEscape)
        return ()=> window.removeEventListener('keydown',handleKeyboardEscape)
    })
  return (
    <NotificationContext.Provider value={value}>
        {children}
        {
            createPortal(
                <div className='fixed top-0 left-0 w-screen h-screen flex justify-end items-start '>
                    <span onClick={closeNotification} className='absolute top-0 left-0 z-2 w-screen h-screen bg-black opacity-0'></span>
                  { 
                        open ? <div className={`max-w-full relative z-3 my-2 animate-notification p-2 px-4 flex gap-4 rounded-sm tex-sm border border-[${notification.status === 'success' ? 'var(--color-green-600)': 'var(--color-red-600)'}] mr-3 w-[fit-content] h-[fit-content] origin-center status-bg-${notification.status} status-${notification.status}`}>
                          {notification.message}
													<Button onClick={closeNotification} className={`cursor-pointer status-${notification.status}`}>&times;</Button>	
                        </div> :
                        ''
                    }
                </div>,
                notification_root
            )
        }
        
    </NotificationContext.Provider>
  )
}

export default NotificationProvider