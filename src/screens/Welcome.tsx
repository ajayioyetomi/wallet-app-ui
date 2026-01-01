import css from './welcome.module.css';
const Welcome = () => {
  return (
    <section className="dark:bg-black bg-purple-400 w-screen h-screen flex items-center justify-center">
        <div className={`dark:text-purple-300 text-white text-3xl font-bold origin-center ${css.welcome_text}`}>Welcome</div>
    </section>
  )
} 

export default Welcome