import { useParams } from "react-router-dom";

const Booking = () => {

    const { id } = useParams();
    return (
        <div>Booking Page  {id} station Id</div>
    )
}

export default Booking