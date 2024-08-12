"use client";

import React, { useState, useEffect } from "react";
import { collection, addDoc, querySnapshot, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {
  const [items, setItems] = useState([
  ]);

  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const [total, setTotal] = useState(0);

  // Add item to database
  const addItem =  async (e) => {
    e.preventDefault();
    if (newItem.name !== '' && newItem.price !== '') {
      await addDoc(collection(db, "items"), {
        name: newItem.name.trim(),
        price: newItem.price,
      });
      setNewItem({name: '', price: ''});
    }
  };

  // Read items from database
  useEffect(() => {
    const q = querySnapshot(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(), id: doc.id});
      });
      setItems(itemsArr);

      // Read total from itemsArray
      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce((sum, item) => sum + parseFloat(item.price), 0);
        setTotal(totalPrice);
      };
      calculateTotal();
      return () => unsubscribe();

    });
  }, []);

  // Delete items from database

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl p-4 text-center">what's in ur pantry? 🛒</h1>
        <div className="p-4">
          <form className="grid grid-cols-6 items-center text-gray-400">
            <input 
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="col-span-3 p-3 border rounded-lg" 
              type="text" 
              placeholder="" 
            />
            <input 
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              className="col-span-2 p-3 border mx-3 rounded-lg" 
              type="text" 
              placeholder="" 
            />
            <button 
              onClick={addItem}
              className="text-white bg-slate-400 hover:bg-slate-500 p-3 text-xl rounded-lg" 
              type="submit"
            >+
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li key={id} className="my-4 w-full flex justify-between">
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>${item.price}</span>
                </div>
                <button className="ml-8 p-4 border-l-2 border-slate-400 hover:bg-slate-400 w-16 hover:text-slate-50">
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? ("") : (
            <div className="flex justify-between p-3">
              <span>Total</span>
              <span>$(total)</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
