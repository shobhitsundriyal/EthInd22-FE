import React from 'react'

const TopNavBar = () => {
	return (
		<div className='h-16 bg-transparent rounded-b-lg flex backdrop:blur-sm text-white px-6 border-b-[1px] sticky top-0 backdrop-blur-sm'>
			<div className='flex justify-center items-center space-x-20 pl-7'>
				<span>Home</span>
				<span>Submit Paper</span>
				<span>kk</span>
				<span>Marketplace</span>
			</div>
			<div className='flex justify-end items-center flex-grow'>
				<button className='btn btn-accent btn-sm'>
					Connect Wallet
				</button>
			</div>
		</div>
	)
}

export default TopNavBar
