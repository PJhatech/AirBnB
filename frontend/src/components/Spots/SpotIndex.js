
// import React, {useEffect} from "react";
// import {useSelector, useDispatch} from "react-redux";
// import {useParams} from "react-router-dom";
// import {spotIndexThunk} from "../../store/spots";

// const SpotPage = (props) => {
//    const { id } = useParams();
//    const dispatch = useDispatch();
//    const spotIndexSelector = useSelector((state) => state.spots);
//    const spot = Object.values(spotIndexSelector);

//    useEffect(() => {
//       dispatch(spotIndexThunk(id));
//    }, []);

//    console.log(props.spot, "<===========1===========>");
//    // console.log(spotIndexSelector, "<===========2===========>");
//    return (
//       <div>
//           {spot.map(({name}) => (
//             <div>
//                {spot}
// 				{ console.log(spot) }
// 			</div>
//          ))}
// 		</div>
// 	);
// };

// export default SpotPage;
