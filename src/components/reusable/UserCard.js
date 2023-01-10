import React from "react";
import userAvater from '../../assets/user.svg';

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
    <div
      key={_id}
      className="border shadow-lg p-5 rounded-lg"
    >
      <div className="flex justify-between">
        <div >
            <img className="w-14" src={userAvater} alt="" />
          <p className="text capitalize ">
            Name : {firstName} {lastName}
          </p>
          {address && (
            <div>
              <p>Country : {country} </p>
            </div>
          )}
          {companyCategory && <p>Category : {companyCategory}</p>}

          <small className="text-primary/70 ">
            {companyName && (
              <span className="font-semibold hover:text-primary  transition-all">
                Company Name : {companyName}
              </span>
            )}
          </small>
        </div>
        <div className="flex-row items-center bg-primary/10 p-2 rounded-lg">
          {employeeRange && <span>Employee Range : {employeeRange}</span>}
          {roleInCompany && <p> Role in Company : {roleInCompany}</p>}
          {address && (
            <div>
              <h6>Address : {address}</h6>
              <h5 className="mr-4">City : {city}</h5>
              <span>Post code : {postcode}</span>
            </div>
          )}
          {gender && <p>Gender : {gender}</p>}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
