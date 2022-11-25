import Navbar from '../components/Navbar'

export default ({ children }) => {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    )
}