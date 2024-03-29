import { useState, createContext } from "react"

const userContext = createContext()
const UserProvider = ({ children }) => {
    const [user, setUser] = useState({})

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    )
}

export { UserProvider, userContext }