import React from 'react'
import { Link } from "react-router-dom";
import Button from "components/Button/Button";

export default function Navbar() {
  return (
    <nav className="grid grid-cols-12  py-8 mx-7 md:mx-32 bg-transparent">
            <div className="col-span-2">
              <Link to="/" className="md:text-3xl text-2xl font-bold font-nunito text-green-primary">Cempat.in</Link>
            </div>
            <div className="col-span-5 flex justify-end col-start-8 md:col-start-11 ">
              <Link to={"/gabung"} aria-label="gabung">
                <Button size="xs" variant="outline-secondary">Gabung</Button>
              </Link>
              <Link to={"/login"} aria-label="login">
                <Button size="xs" variant="secondary" >Sign In</Button>
              </Link>
            </div>

          </nav>
  )
}