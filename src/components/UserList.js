import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import EditUser from "./EditUser";
import UserCard from "./UserCard";
import Toast from "./Toast";
import { motion, useInView } from "framer-motion";
const UserList = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPageUsers, setCurrentPageUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState(null);
  const usersPerPage = 8;

  const fetchAllUsers = async () => {
    let page = 1;
    let allFetchedUsers = [];
    while (true) {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`
      );
      allFetchedUsers = [...allFetchedUsers, ...response.data.data];
      if (page >= response.data.total_pages) break;
      page++;
    }
    setAllUsers(allFetchedUsers);
    setFilteredUsers(allFetchedUsers);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = allUsers.filter((user) =>
      `${user.first_name} ${user.last_name} ${user.email}`
        .toLowerCase()
        .includes(lowercasedQuery)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchQuery, allUsers]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    setCurrentPageUsers(filteredUsers.slice(startIndex, endIndex));
  }, [currentPage, filteredUsers]);

  const handleUpdateUser = (updatedUser) => {
    setAllUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      setAllUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
      setMessage({ type: "success", text: "User deleted successfully!" });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to delete user. Please try again.",
      });
    }
  };
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };
  return (
    <div x className="flex flex-col gap-8  bg-purple-100">
      <div className="flex px-5 py-3 justify-between items-center  bg-purple-400 w-full">
        <div className="text-xl font-bold  flex items-center justify-center text-gray-900">
          Users List
        </div>

        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none focus:border-none p-2 rounded w-full"
          />
        </div>
      </div>
      {message && (
        <div className="bg-purple-100 flex items-center justify-center">
          <Toast message={message} setMessage={setMessage} />
        </div>
      )}
      <div className="py-2 px-6 bg-purple-100 ">
        <ul
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10"
        >
          {currentPageUsers.length > 0 ? (
            currentPageUsers.map((user, index) => (
              <motion.li
                key={index}
                variants={cardVariants}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                transition={{ duration: 0.2, delay: index * 0.2 }}
              >
                {" "}
                <UserCard
                  user={user}
                  setEditingUser={setEditingUser}
                  handleDeleteUser={handleDeleteUser}
                ></UserCard>
              </motion.li>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">
              No users found.
            </p>
          )}
        </ul>
        {editingUser && (
          <EditUser
            user={editingUser}
            onClose={() => setEditingUser(null)}
            onUpdate={handleUpdateUser}
          />
        )}
      </div>
      <div className="flex items-center justify-center mb-5">
        <div className="flex mt-6 gap-5">
          <motion.button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="bg-purple-200 px-4 py-2 rounded"
            disabled={currentPage === 1}
            whileTap={{ scale: 0.8 }}
          >
            <i class="fi fi-rs-angle-small-left"></i>
          </motion.button>
          <div className="flex gap-2">
            {Array.from(
              { length: Math.ceil(filteredUsers.length / usersPerPage) },
              (_, i) => i + 1
            )
              .slice(
                Math.max(0, currentPage - 3),
                Math.min(
                  Math.ceil(filteredUsers.length / usersPerPage),
                  currentPage + 2
                )
              )
              .map((page) => (
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded ${
                    page === currentPage
                      ? "bg-purple-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {page}
                </motion.button>
              ))}
          </div>
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() =>
              setCurrentPage((prev) =>
                prev < Math.ceil(filteredUsers.length / usersPerPage)
                  ? prev + 1
                  : prev
              )
            }
            className="bg-purple-200 px-4 py-2 rounded"
            disabled={
              currentPage >= Math.ceil(filteredUsers.length / usersPerPage)
            }
          >
            <i class="fi fi-rs-angle-small-right"></i>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
