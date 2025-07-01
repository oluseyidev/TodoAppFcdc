import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { motion } from "framer-motion";

const Home = () => {
  const [user, setUser] = useState(null);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "tasks"),
        where("uid", "==", user.uid)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksData);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleAdd = async () => {
    if (task.trim() === "") return;
    await addDoc(collection(db, "tasks"), {
      text: task,
      uid: user.uid,
      createdAt: new Date(),
    });
    setTask("");
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  if (!user) {
    return <p className="text-center mt-10 text-lg">Please log in to manage your tasks.</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.email}</h2>
      <div className="flex mb-4 gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add new task..."
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map((t) => (
            <motion.li
              key={t.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-between items-center border-b py-2"
            >
              <span>{t.text}</span>
              <button
                onClick={() => handleDelete(t.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
