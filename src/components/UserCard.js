import React from "react";
import { motion } from "framer-motion";
const UserCard = ({ user, setEditingUser, handleDeleteUser }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      key={user.id}
      className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-2xl "
    >
      <div className="relative">
        <img
          src={user.avatar}
          alt={user.first_name}
          className="w-20 h-20 rounded-full mb-4 border-4 border-purple-500"
        />
        <span className="absolute bottom-0 right-0 bg-green-500 text-white text-xs rounded-full px-2 py-1">
          Active
        </span>
      </div>

      <h2 className="text-lg font-bold text-gray-800">
        {user.first_name} {user.last_name}
      </h2>

      <p className="text-sm text-gray-600 mb-4">{user.email}</p>

      <div className="flex justify-end items-end w-full">
        {" "}
        <div className="flex gap-2">
          <motion.button
            className="bg-purple-500 text-white px-3 py-2 rounded-md hover:bg-purple-600 transition-colors duration-200 flex items-center justify-center"
            whileTap={{ scale: 0.8 }}
            onClick={() => setEditingUser(user)}
          >
            <i class="fi fi-sc-pencil"></i>
          </motion.button>
          <motion.button
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
            whileTap={{ scale: 0.8 }}
            onClick={() => handleDeleteUser(user.id)}
          >
            <i class="fi fi-br-trash"></i>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
