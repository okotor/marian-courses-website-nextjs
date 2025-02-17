'use server';

import { redirect } from 'next/navigation';

import { saveCourse } from "./db-content";
import { revalidatePath } from 'next/cache';
import { createUser } from '@/lib/user';
import { hashUserPassword } from './hash-passwords';

function isInvalidText(text) {
    return !text || text.trim() === '';
}

export async function createACourse (prevState, formData) {
    // Get the current date
    const today = new Date();

    // Extract the year, day, and month
    const year = today.getFullYear();
    const day = String(today.getDate()).padStart(2, '0'); // Ensure day is two digits
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Ensure month is two digits (months are zero-indexed)

    // Format the date as YYYY-DD-MM
    const formattedDate = `${year}-${day}-${month}`;

    console.log(formattedDate); // Output will be in the format YYYY-DD-MM

    const course = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        course_description: formData.get('course_description'),
        lecturer: formData.get('name'),
        lecturer_email: formData.get('email'),
        image: formData.get('image'),
        date: formattedDate
    }

    console.log(course);

    if (
      isInvalidText(course.title) ||
      isInvalidText(course.summary) ||
      isInvalidText(course.course_description) ||
      isInvalidText(course.lecturer) ||
      isInvalidText(course.lecturer_email) ||
      !course.lecturer_email.includes('@') ||
      !course.image ||
      course.image.size === 0
    ) {
        return {
            message: 'Je třeba vyplnit všechna pole validním obsahem.'
        }
    }
  

    await saveCourse(course);
    revalidatePath('/courses');
    redirect('/courses')
}



export async function signup(prevState, formData){
    const email = formData.get('email')
    const password = formData.get('password')

    let errors = {};

    if (!email.includes('@')) {
        errors.email = 'Vložte validní emailovou adresu.'
    }

    if (password.trim().length < 8) {
        errors.password = 'Heslo musí mít alespoň 8 znaků.'
    }

    if (Object.keys(errors).length > 0) {
        return {
            errors,
        };
    }

    const hashedPassword = await hashUserPassword(password);
    console.log("Hashed Password:", hashedPassword);
    try {
        createUser(email, hashedPassword);
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return {
                errors: {
                    email: 'Vypadá to, že uživatel s touto emailovou adresou již existuje.'
                }
            };
        }
        throw error;
    }
    
    redirect('/my-courses');
}