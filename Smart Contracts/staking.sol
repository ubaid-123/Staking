pragma solidity ^0.6.0;
// SPDX-License-Identifier: UNLICENSED
import "SafeMath.sol";
import "WETH9.sol";
import "ERC20.sol";
import "IERC20.sol";

contract StakingToken is ERC20{
     
    
    using SafeMath for uint256;
    WETH9 public WETH;
    IERC20 token;
    address payable public owner;
    
     //notice We usually require to know who are all the stakeholders.
     
    address[] public stakeholders;

    
     //notice The stakes for each stakeholder.
     
    mapping(address => uint256) public stakes;

    
      //@notice The accumulated rewards for each stakeholder.
     
    mapping(address => uint256) public rewards;
    
    /**
     * @notice The constructor for the Staking Token.
     */
    constructor()
        public 
        
    { 
        WETH = WETH9(0x9BDE768BeDbec8A8b46e5F53Fb863d23FA90c1c6);
        token = IERC20(address(this));
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner,"You are not an Owner.");
        _;
    }
    // ---------- STAKES ----------

    
    /**
     * @notice A method for a stakeholder to create a stake.
     * @param _stake The size of the stake to be created.
     */
     
    function createStake(uint256 _stake)
        public
    {
        
        _stake = _stake *10**18;
        transfer(address(this), _stake);
        if(stakes[msg.sender] == 0) addStakeholder(msg.sender);
        stakes[msg.sender] = stakes[msg.sender].add(_stake);
    }


    function removeStake()
        external
    {
        if(stakes[msg.sender] == 0) removeStakeholder(msg.sender);
        token.transfer(msg.sender, stakes[msg.sender]);
        stakes[msg.sender] = 0;
    }

    /**
     * @notice A method to retrieve the stake for a stakeholder.
     * @param _stakeholder The stakeholder to retrieve the stake for.
     * @return uint256 The amount of wei staked.
     */
    function stakeOf(address _stakeholder)
        public
        view
        returns(uint256)
    {
        return stakes[_stakeholder];
    }

    /**
     * @notice A method to the aggregated stakes from all stakeholders.
     * @return uint256 The aggregated stakes from all stakeholders.
     */
    function totalStakes()
        public
        view
        returns(uint256)
    {
        uint256 _totalStakes = 0;
        for (uint256 s = 0; s < stakeholders.length; s += 1){
            _totalStakes = _totalStakes.add(stakes[stakeholders[s]]);
        }
        return _totalStakes;
    }

    // ---------- STAKEHOLDERS ----------

    /**
     * @notice A method to check if an address is a stakeholder.
     * @param _address The address to verify.
     * @return bool, uint256 Whether the address is a stakeholder, 
     * and if so its position in the stakeholders array.
     */
    function isStakeholder(address _address)
        public
        view
        returns(bool, uint256)
    {
        for (uint256 s = 0; s < stakeholders.length; s += 1){
            if (_address == stakeholders[s]) return (true, s);
        }
        return (false, 0);
    }

    /**
     * @notice A method to add a stakeholder.
     * @param _stakeholder The stakeholder to add.
     */
    function addStakeholder(address _stakeholder)
        public
    {
        (bool _isStakeholder, ) = isStakeholder(_stakeholder);
        if(!_isStakeholder) stakeholders.push(_stakeholder);
    }

    /**
     * @notice A method to remove a stakeholder.
     * @param _stakeholder The stakeholder to remove.
     */
    function removeStakeholder(address _stakeholder)
        public
    {
        (bool _isStakeholder, uint256 s) = isStakeholder(_stakeholder);
        if(_isStakeholder){
            stakeholders[s] = stakeholders[stakeholders.length - 1];
            stakeholders.pop();
        } 
    }

    // ---------- REWARDS ----------
    
    /**
     * @notice A method to allow a stakeholder to check his rewards.
     * @param _stakeholder The stakeholder to check rewards for.
     */
    function rewardOf(address _stakeholder) 
        public
        view
        returns(uint256)
    {
        return rewards[_stakeholder];
    }

    /**
     * @notice A method to the aggregated rewards from all stakeholders.
     * @return uint256 The aggregated rewards from all stakeholders.
     */
    function totalRewards()
        public
        view
        returns(uint256)
    {
        uint256 _totalRewards = 0;
        for (uint256 s = 0; s < stakeholders.length; s += 1){
            _totalRewards = _totalRewards.add(rewards[stakeholders[s]]);
        }
        return _totalRewards;
    }

    /*function calculateReward(address _stakeholder)
        external
        
        returns(uint256)
    {
        return stakes[_stakeholder] / 100;
        (WETH.balanceOf(address(this))) / totalStakes())*10**18)
    }*/

    /**
     * @notice A method to distribute rewards to all stakeholders.
     */
     
    function distributeRewards(uint balance) 
        onlyOwner
        external
        
    {
        for (uint256 s = 0; s < stakeholders.length; s += 1){
            address stakeholder = stakeholders[s];
            uint reward = ((balance / (totalStakes()/10**18)) * stakes[stakeholder])/(10**18);
            rewards[stakeholder] = rewards[stakeholder].add(reward);
        }
    }
    
    
    function mintNewTokens(uint256 amount) 
        onlyOwner
        public {
        _mint(msg.sender,amount);
    }

    /**
     * @notice A method to allow a stakeholder to withdraw his rewards.
     */
    function withdrawReward() 
    external
    {
        uint reward = rewards[msg.sender];
        rewards[msg.sender] = 0;
        WETH.transfer(msg.sender, reward);
        
    }
    
    
}