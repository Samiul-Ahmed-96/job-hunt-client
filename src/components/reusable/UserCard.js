import React from "react";
import { CiLocationOn } from "react-icons/ci";
import femaleAvater from "../../assets/female.svg";
import maleAvater from "../../assets/user.svg";

const UserCard = ({ userData }) => {
  const {
    _id,
    firstName,
    lastName,
    email,
    gender,
    companyName,
    employeeRange,
    companyCategory,
    roleInCompany,
    country,
    address,
    city,
    postcode,
    role,
  } = userData || {};
  return (
    <div key={_id} className="border shadow-lg p-5 rounded-lg">
      <div className="flex justify-between">
        <div>
          <img
            className="w-14"
            src={gender == "male" ? maleAvater : femaleAvater}
            alt="user"
          />
         
          <p className="text capitalize text-sm my-2 text-primary bolder">
            {firstName} {lastName}
          </p>
          {address && (
            <div className="flex items-center gap-1">
              <CiLocationOn />
              <span className="capitalize">{country} </span>
            </div>
          )}
          {companyCategory && <p className="capitalize"> {companyCategory}</p>}

          <small className="text-primary/70 ">
            {companyName && (
              <span className="font-semibold hover:text-primary capitalize  transition-all">
                Company : {companyName}
              </span>
            )}
          </small>
        </div>
        <div className="flex-row items-center bg-primary/10 border p-2 rounded-lg">
          {employeeRange && (
            <span className="text-xs">Employee Range : {employeeRange}</span>
          )}
          {roleInCompany && (
            <p className="text-xl text-primary mt-2 bg-white rounded-md p-3">
              {" "}
              <p className="text-black">Position</p>
              {roleInCompany}
            </p>
          )}
          {address && (
            <div>
              <h6 className="text-primary">Address</h6>
              <h6 className="capitalize text-md"> {address}</h6>
              <h5 className="mr-4 capitalize text-md"> {city}</h5>
              <span className="capitalize text-md"> {postcode}</span>
            </div>
          )}

          {/*{gender && <p className="capitalize">Gender : {gender}</p>}*/}
          {/*{role && <p className="capitalize">Role in Company</p>}*/}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
