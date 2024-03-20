"use server";

import { revalidatePath } from "next/cache";

import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    // 连接到数据库
    await connectToDatabase();

    // 创建新用户
    const newUser = await User.create(user);

    // 将新用户对象转化为JSON字符串，并再次解析为JSON对象，以确保去除可能的循环引用问题
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
/**
 * 更新用户信息
 *
 * @param clerkId 用户ID
 * @param user 更新用户信息的参数
 * @returns 返回更新后的用户信息
 * @throws 如果更新失败，则抛出错误
 */
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    // 连接到数据库
    await connectToDatabase();

    // 查找并更新用户信息
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    // 如果更新失败，则抛出错误
    if (!updatedUser) throw new Error("User update failed");

    // 将更新后的用户信息转换为JSON格式并返回
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    // 处理错误
    handleError(error);
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    // 连接到数据库
    await connectToDatabase();

    // 查找并更新用户信用余额
    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee }},
      { new: true }
    )

    // 如果更新失败，抛出错误
    if(!updatedUserCredits) throw new Error("User credits update failed");

    // 返回更新后的用户信息（转换为JSON字符串后再解析回来）
    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    // 处理错误
    handleError(error);
  }
}