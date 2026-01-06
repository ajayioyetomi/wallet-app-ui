import type React from "react";

import { Header } from "../components";

type MainType = {
    children: React.ReactNode | null
}
const MainScreen = ({children}:MainType) => {
  return (
    <main className='fixed left-0 top-0 w-screen h-screen flex flex-col-reverse sm:flex-row'>
        <aside className='w-full sm:w-[60px] md:w-[250px] h-[60-px] sm:h-full border-top-gray-200'>
            <Header />
        </aside>
        <section className='flex-1 h-[calc(100% - 60px)] md:h-full'>
            {children}
        </section>
    </main>
  )
}

export default MainScreen