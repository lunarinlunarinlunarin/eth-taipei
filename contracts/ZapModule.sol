// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.0 <0.9.0;

interface IUniswapV2Router {
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB, uint liquidity);

    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
}

interface IUniswapV2Factory {
    function getPair(
        address token0,
        address token1
    ) external view returns (address);
}

interface IUniswapV2Pair {
    function token0() external view returns (address);

    function token1() external view returns (address);

    function getReserves()
        external
        view
        returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
}

interface IERC20 {
    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external returns (bool);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);
}

contract Enum {
    enum Operation {
        Call,
        DelegateCall
    }
}

interface GnosisSafe {
    /// @dev Allows a Module to execute a Safe transaction without any further confirmations.
    /// @param to Destination address of module transaction.
    /// @param value Ether value of module transaction.
    /// @param data Data payload of module transaction.
    /// @param operation Operation type of module transaction.
    function execTransactionFromModule(
        address to,
        uint256 value,
        bytes calldata data,
        Enum.Operation operation
    ) external returns (bool success);
}

contract ZapModule {
    string public constant NAME = "Zap Module";
    string public constant VERSION = "0.0.1";

    IUniswapV2Factory public constant FACTORY =
        IUniswapV2Factory(0xc35DADB65012eC5796536bD9864eD8773aBc74C4);
    IUniswapV2Router public constant ROUTER =
        IUniswapV2Router(0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506);

    // Safe -> Worker -> can worker execute dca?
    mapping(address => mapping(address => bool)) authorized;
    // Safe -> source token -> paired token -> can we zap source token to LP of source/paired tokens?
    mapping(address => mapping(address => mapping(address => bool))) canZap;

    event AddWorker(address indexed safe, address worker);
    event RemoveWorker(address indexed safe, address worker);
    event AddAllowedZap(
        address indexed safe,
        address sourceToken,
        address pairedToken
    );
    event RemoveAllowedZap(
        address indexed safe,
        address sourceToken,
        address pairedToken
    );
    event ExecuteZap(
        address indexed safe,
        address worker,
        address sourceToken,
        address pairedToken,
        uint256 sourceTokenAmount,
        uint256 lpAmount
    );

    function addAllowedZap(address _sourceToken, address _pairedToken) public {
        canZap[msg.sender][_sourceToken][_pairedToken] = true;
        emit AddAllowedZap(msg.sender, _sourceToken, _pairedToken);
    }

    function removeAllowedZap(
        address _sourceToken,
        address _pairedToken
    ) public {
        canZap[msg.sender][_sourceToken][_pairedToken] = false;
        emit RemoveAllowedZap(msg.sender, _sourceToken, _pairedToken);
    }

    function addWorker(address _worker) public {
        authorized[msg.sender][_worker] = true;
        emit AddWorker(msg.sender, _worker);
    }

    function removeWorker(address _worker) public {
        authorized[msg.sender][_worker] = false;
        emit RemoveWorker(msg.sender, _worker);
    }

    function executeZap(
        GnosisSafe _safe,
        address _sourceToken,
        address pairedToken
    ) public {
        // Internal checks
        require(
            authorized[address(_safe)][msg.sender],
            "Only authorized workers can execute zaps"
        );
        require(
            canZap[address(_safe)][_sourceToken][pairedToken],
            "Zap not allowed"
        );

        // Effects
        // (none?)

        // External interactions
        require(
            IERC20(_sourceToken).balanceOf(address(_safe)) > 0,
            "No tokens to zap"
        );

        zap(_safe, IERC20(_sourceToken), IERC20(pairedToken), IERC20(_sourceToken).balanceOf(address(_safe)));
    }

    function zap(
        GnosisSafe _safe,
        IERC20 _sourceToken,
        IERC20 _pairedToken,
        uint256 _sourceTokenAmount
    ) private {
        uint256 toSwap = _sourceTokenAmount / 2; // floor?
        uint256 amountA = _sourceTokenAmount - toSwap;

        _swap(_safe, _sourceToken, _pairedToken, toSwap);

        uint256 amountB = _pairedToken.balanceOf(address(_safe));

        _addLiquidity(_safe, _sourceToken, _pairedToken, amountA, amountB);
    }

    function _swap(
        GnosisSafe _safe,
        IERC20 _from,
        IERC20 _to,
        uint256 _sourceTokenAmount
    ) private {
        // external interactions
        bytes memory approveData = abi.encodeCall(
            _from.approve,
            (address(ROUTER), _sourceTokenAmount)
        );
        _safe.execTransactionFromModule(
            address(_from),
            0,
            approveData,
            Enum.Operation.Call
        );

        address[] memory path = new address[](2);
        path[0] = address(_from);
        path[1] = address(_to);

        bytes memory swapData = abi.encodeCall(
            ROUTER.swapExactTokensForTokens,
            (_sourceTokenAmount, 1, path, address(_safe), block.timestamp)
        );

        _safe.execTransactionFromModule(
            address(ROUTER),
            0,
            swapData,
            Enum.Operation.Call
        );
    }

    function _addLiquidity(
        GnosisSafe _safe,
        IERC20 _tokenA,
        IERC20 _tokenB,
        uint256 _amountA,
        uint256 _amountB
    ) private {
        // external interactions
        bytes memory approveData = abi.encodeCall(
            _tokenA.approve,
            (address(ROUTER), _amountA)
        );

        _safe.execTransactionFromModule(
            address(_tokenA),
            0,
            approveData,
            Enum.Operation.Call
        );

        approveData = abi.encodeCall(
            _tokenB.approve,
            (address(ROUTER), _amountB)
        );

        _safe.execTransactionFromModule(
            address(_tokenB),
            0,
            approveData,
            Enum.Operation.Call
        );

        bytes memory addLiquidityData = abi.encodeCall(
            ROUTER.addLiquidity,
            (
                address(_tokenA),
                address(_tokenB),
                _amountA,
                _amountB,
                1, // TODO: probably a good idea to pass in an expected price to reduce impact of sandwiching
                1, // TODO: probably a good idea to pass in an expected price to reduce impact of sandwiching
                address(_safe),
                block.timestamp
            )
        );

        _safe.execTransactionFromModule(
            address(ROUTER),
            0,
            addLiquidityData,
            Enum.Operation.Call
        );
    }
}
