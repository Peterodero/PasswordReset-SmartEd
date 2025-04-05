import { Link } from "react-router-dom";

export default function WelcomePage(){
    return(
        <div className="welcome">
            <h1>Welcome Kiongozi</h1>
            <p>Click the <Link to="/reset-password/:token">link</Link> to reset your password</p>
        </div>
    )
}