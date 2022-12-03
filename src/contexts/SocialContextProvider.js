import { useContext, useState } from 'react'
import SocialContext from './SocialContext'

const SocialContextProvider = (props) => {
	const [socialContextState, setSocialContextState] = useState()
	return (
		<SocialContext.Provider
			value={{ socialContextState, setSocialContextState }}
		>
			{props.children}
		</SocialContext.Provider>
	)
}

export default SocialContextProvider
export const useSocialContext = () => useContext(SocialContext)
