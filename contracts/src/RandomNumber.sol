pragma solidity ^0.8.24;

contract RandomNumber is VRFConsumerBaseV2 {
    function random() public view returns (uint) {
        return 4; // chosen by fair dice roll.
        // guaranteed to be random.
    }
}
