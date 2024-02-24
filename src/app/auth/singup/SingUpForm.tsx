"use client";

import { revalidateAction } from "@/app/(main-app)/action";
import Avater from "@/component/Avater";
import Button from "@/component/UI/Button";
import Input from "@/component/UI/Input";
import { createSupabaseBrowserClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import { ZodError, z } from "zod";

const singUpSchema = z.object({
  name: z.string({ required_error: "Plese add your name" }),
  image: z.unknown(),
  email: z.string().email("Please use a valid email"),
  password: z.string().min(6, "Password must be 6 charecter long"),
});

type CustomFromError = {
  email?: string[];
  password?: string[];
  name?: string[];
};

function SingUpForm() {
  const [errors, setErrors] = useState<CustomFromError>();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("/images/default-profile.png");
  const [previewImage, setPreviewImage] = useState("");
  const [dontUploadAvater, setDontUploadAvater] = useState(false);

  const router = useRouter();

  const supabase = createSupabaseBrowserClient();

  type FormFildsT = {
    name: string;
    email: string;
    password: string;
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0])
      return toast.warning("Please add a image");

    const image = e.target.files[0];
    const sizeInMB = image.size / (1024 * 1024);

    if (sizeInMB > 2) {
      return toast.warning("File size should be less then 2mb");
    }
    setPreviewImage(URL.createObjectURL(image));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const userData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      image: formData.get("profile-pic") as File,
    };

    const valid = singUpSchema.safeParse(userData);
    setErrors(undefined);

    if (!valid.success) {
      setLoading(false);
      return setErrors(valid.error.formErrors.fieldErrors);
    }

    if (!dontUploadAvater && !previewImage) {
      setLoading(false);
      toast.warning("Please upload a image");
      return;
    }

    const singUpData = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (singUpData.error) {
      setLoading(false);
      return toast.error(singUpData.error.message);
    }

    let imgUrl = `https://uzvunajzkvpimdfiyhzb.supabase.co/storage/v1/object/public/avaters/default/avater_1.png`;

    if (dontUploadAvater) {
      const uploadUser = await supabase.from("users").insert({
        avater: imgUrl,
        user_name: userData.name,
      });

      if (uploadUser.error) {
        toast.warning(uploadUser.error.message);
        return setLoading(false);
      }

      revalidateAction("/");
      router.push("/");
      return;
    }

    const imageUpload = await supabase.storage
      .from("avaters")
      .upload(
        `${singUpData.data.user?.id}/avater_1.${
          userData.image.type.split("/")[1]
        }`,
        userData.image,
      );

    imgUrl = `https://uzvunajzkvpimdfiyhzb.supabase.co/storage/v1/object/public/avaters/${imageUpload.data?.path}`;

    const uploadUser = await supabase.from("users").insert({
      avater: imgUrl,
      user_name: userData.name,
    });

    if (uploadUser.error) {
      toast.warning(uploadUser.error.message);
      return setLoading(false);
    }

    router.push("/");
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-1">
      <div className="mb-2 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <label
            htmlFor="file-upload"
            className="transition-all duration-150 hover:opacity-55"
          >
            <Avater
              src={previewImage ? previewImage : "/images/default-avater.png"}
              alt=""
              className={"pointer-events-none"}
            />
          </label>
          <p>Your profile pic</p>
        </div>
        <input
          onChange={handleImageChange}
          type="file"
          name="profile-pic"
          hidden
          id="file-upload"
        />

        <div className="flex items-center gap-3 py-2">
          <input
            type="checkbox"
            name=""
            id="dontupload-chackbox"
            className="h-fit w-fit scale-125"
            onChange={(e) => setDontUploadAvater(e.target.checked)}
          />
          <label htmlFor="dontupload-chackbox">Don&apos;t upload Image</label>
        </div>
        <label
          htmlFor="file-upload"
          className="flex flex-col justify-start transition-all duration-150 hover:opacity-55"
        >
          <Button type="button" className="pointer-events-none bg-secondary">
            Upload Image
          </Button>
        </label>
      </div>
      <Input
        name="name"
        label="name*"
        placeHolder="e.g robin@gmail.com"
        error={errors?.name && errors.name[0]}
      />
      <Input
        name="email"
        label="Email*"
        placeHolder="e.g robin@gmail.com"
        error={errors?.email && errors.email[0]}
      />
      <Input
        name="password"
        label="Password*"
        placeHolder="password"
        error={errors?.password && errors.password[0]}
      />
      <Button type="submit" loading={loading} className="mt-3">
        Create Account
      </Button>
    </form>
  );
}

export default SingUpForm;
