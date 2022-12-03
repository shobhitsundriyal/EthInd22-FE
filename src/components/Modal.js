import React, { useEffect, useRef } from 'react'

const Modal = ({
	isOpenModal,
	headerText,
	mainText,
	isLoading,
	showCloseButton,
}) => {
	const modalRef = useRef()
	useEffect(() => {
		modalRef.current.checked = isOpenModal
	}, [isOpenModal])

	return (
		<>
			{/* The button to open modal */}
			{/* <label htmlFor='my-modal-6' className='btn'>
				open modal
			</label> */}
			{/* Put this part before </body> tag */}
			<input
				type='checkbox'
				id='my-modal-6'
				className='modal-toggle'
				ref={modalRef}
			/>
			<div className='modal modal-bottom sm:modal-middle'>
				<div className='modal-box'>
					{isLoading && (
						// <progress className='progress w-[100%] bg-primary text-primary'></progress>
						<div
							className='radial-progress animate-spin text-accent-focus mb-5'
							style={{
								'--value': 60,
								'--size': '2.5rem',
							}}
						></div>
					)}
					<h3 className='font-bold text-lg z-2'>{headerText}</h3>
					<p className='py-4'>{mainText}</p>
					<div className='modal-action'>
						{showCloseButton && (
							<label htmlFor='my-modal-6' className='btn'>
								Close
							</label>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default Modal
