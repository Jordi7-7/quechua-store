import { login, signup } from './actions'

export default function LoginPage() {
    return (
        <form className='flex m-auto'>
            <div className='flex-col flex '>
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" required
                className='text-zinc-900' />
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" required
                    className='text-zinc-900' />
                <button formAction={login}>Log in</button>
                {/* <button formAction={signup}>Sign up</button> */}
            </div>
        </form>
    )
}