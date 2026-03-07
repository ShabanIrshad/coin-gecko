const TableRow=({data})=>{
    // console.log(data);
    function formatMarketCap(num) {
        if (num >= 1e12) {
            return (num / 1e12).toFixed(2) + "T";
        } else if (num >= 1e9) {
            return (num / 1e9).toFixed(2) + "B";
        } else if (num >= 1e6) {
            return (num / 1e6).toFixed(2) + "M";
        } else {
            return num.toLocaleString();
        }
    }
    return(
        <>        
            <tr>
                <td>{data.market_cap_rank}</td>
                <td>
                    
                    <div className="image-coin-symbol">
                        <img src={data.image} alt='coin_img'/>                        
                            <p>{data.name}<b><span>{" ("+data.symbol.toUpperCase()+") "}</span></b></p>
                    </div>
                    
                </td>
                <td>
                    
                    <div className="price-change" style={data.price_change_percentage_24h<0?{color:'#dd1111'}:{color:'#0b8317'}}>
                        <p> {data.price_change_percentage_24h>=0?<b>⬆&nbsp;{"( "+data.price_change_percentage_24h.toFixed(2)+"% )"}</b>:<b>⬇&nbsp;{"( "+data.price_change_percentage_24h.toFixed(2)+"% )"}</b>}</p>
                        <p>{data.price_change_24h.toFixed(3)+"$"}</p>
                    </div>
                </td>
                <td>{data.low_24h.toFixed(2)+" "}<b>/</b>{" "+data.high_24h.toFixed(2)}</td>
                <td><b>{"$"+data.current_price}</b></td>
                <td><b>{formatMarketCap(data.market_cap)}</b></td>
                <td><b>{formatMarketCap(data.total_volume)}</b></td>
            </tr>
        </>
    );
}
export default TableRow;