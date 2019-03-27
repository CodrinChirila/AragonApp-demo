import "@aragon/os/contracts/apps/AragonApp.sol";

pragma solidity 0.4.24;

contract CounterApp is AragonApp {
	
	event Increment(address entity);
	event Decrement(address entity);

	bytes32 constant public INCREMENT_ROLE = keccak256("INCREMENT_ROLE");
	bytes32 constant public DECREMENT_ROLE = keccak256("DECREMENT_ROLE");

	int public value;

	function initialize() onlyInit public {
		initialized();
	}

	function increment() auth(INCREMENT_ROLE) external {
		value += 1;
		emit Increment(msg.sender);
	}

	function decrement() auth(DECREMENT_ROLE) external {
		value -= 1; 
		emit Decrement(msg.sender);
	}
}