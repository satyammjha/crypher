import { useState, createContext } from "react"

const userContext = createContext()
const UserProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    return (
        <userContext.Provider value={{ user, setUser, userLoggedIn, setUserLoggedIn }}>
            {children}
        </userContext.Provider>
    )
}

export { UserProvider, userContext }