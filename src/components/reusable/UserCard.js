import React from "react";
import femaleAvater from '../../assets/female.svg';
import maleAvater from '../../assets/user.svg';

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
            <img className="w-14" src={gender == 'male' ? maleAvater : femaleAvater } alt="user" />
          <p className="text capitalize text-sm">
            Name : {firstName} {lastName}
          </p>
          {address && (
            <div>
              <p className="capitalize">Country : {country} </p>
            </div>
          )}
          {companyCategory && <p className="capitalize"> {companyCategory}</p>}

          <small className="text-primary/70 ">
            {companyName && (
              <span className="font-semibold hover:text-primary capitalize  transition-all">
                Company Name : {companyName}
              </span>
            )}
          </small>
        </div>
        <div className="flex-row items-center bg-primary/10 p-2 rounded-lg">
          {employeeRange && <span className="text-xs">Employee Range : {employeeRange}</span>}
          {roleInCompany && <p className="text-sm"> Role in Company : {roleInCompany}</p>}
          {address && (
            <div>
              <h6 className="capitalize text-xs">Address : {address}</h6>
              <h5 className="mr-4 capitalize text-xs">City : {city}</h5>
              <span className="capitalize text-xs">Post code : {postcode}</span>
            </div>
          )}
          {gender && <p className="capitalize">Gender : {gender}</p>}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
