export const ContractDetails = {
	contractAddr: '0xB2a8590dD0233b96b068d9B5A796c9E3c3e27b0a',
	constractAbi: [
		{
			inputs: [
				{
					internalType: 'uint256',
					name: 'num',
					type: 'uint256',
				},
			],
			name: 'store',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'trustedForwarder',
					type: 'address',
				},
			],
			stateMutability: 'nonpayable',
			type: 'constructor',
		},
		{
			inputs: [],
			name: 'getTrustedForwarder',
			outputs: [
				{
					internalType: 'address',
					name: 'forwarder',
					type: 'address',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [
				{
					internalType: 'address',
					name: 'forwarder',
					type: 'address',
				},
			],
			name: 'isTrustedForwarder',
			outputs: [
				{
					internalType: 'bool',
					name: '',
					type: 'bool',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [],
			name: 'retrieve',
			outputs: [
				{
					internalType: 'uint256',
					name: '',
					type: 'uint256',
				},
			],
			stateMutability: 'view',
			type: 'function',
		},
	],
}
