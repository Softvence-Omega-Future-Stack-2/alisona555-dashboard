"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGetMe, useUpdateProfile } from "@/hooks/useProfile";
import { Loader2, Camera } from "lucide-react";

const profileSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  profile: z.any().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileSettingsPage() {
  const { data: userData, isLoading: isFetching } = useGetMe();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      email: "",
      profile: "",
    },
  });

  const selectedProfile = watch("profile");

  useEffect(() => {
    if (userData?.data) {
      reset({
        username: userData.data.username || "",
        email: userData.data.email || "",
        profile: userData.data.profile || "",
      });
      if (userData.data.profile) {
        setPreviewUrl(userData.data.profile);
      }
    }
  }, [userData, reset]);

  // Handle instant preview
  useEffect(() => {
    if (selectedProfile instanceof File) {
      const url = URL.createObjectURL(selectedProfile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [selectedProfile]);

  const onSubmit = (data: ProfileFormValues) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    
    if (data.profile instanceof File) {
      formData.append("profile", data.profile);
    }

    updateProfile(formData);
  };

  if (isFetching) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-purple" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300">
      <h2 className="text-xl font-bold text-gray-900 mb-6 font-plus-jakarta">
        Personal Information
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[800px]">
        {/* Profile Picture Section */}
        <div className="mb-8 flex items-center gap-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-50 flex items-center justify-center relative group">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-brand-purple/10 flex items-center justify-center text-brand-purple font-bold text-2xl">
                  {userData?.data?.username?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              
              {/* Overlay on hover */}
              <label 
                htmlFor="profile-upload"
                className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <Camera className="h-6 w-6 text-white" />
              </label>
            </div>
            
            {/* Hidden Input */}
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue("profile", file, { shouldDirty: true });
                }
              }}
            />
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-gray-900">Profile Picture</h3>
            <p className="text-xs text-gray-500 mt-1">Recommended size: 400x400px. Max size: 2MB.</p>
            <label 
              htmlFor="profile-upload"
              className="text-xs text-brand-purple font-bold mt-2 cursor-pointer hover:underline inline-block"
            >
              Upload new picture
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* User Name */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#374151]">Full Name</label>
            <Input
              {...register("username")}
              type="text"
              placeholder="Enter name"
              className={`h-12 bg-[#F9FAFB] border-gray-100 focus-visible:ring-1 focus-visible:ring-brand-purple focus-visible:border-brand-purple text-gray-700 placeholder:text-gray-400 rounded-xl ${
                errors.username ? "border-red-500" : ""
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.username.message}</p>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#374151]">Email Address</label>
            <Input
              {...register("email")}
              type="email"
              placeholder="Enter email"
              className={`h-12 bg-[#F9FAFB] border-gray-100 focus-visible:ring-1 focus-visible:ring-brand-purple focus-visible:border-brand-purple text-gray-700 placeholder:text-gray-400 rounded-xl ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center gap-3">
          <Button
            type="submit"
            disabled={isUpdating || !isDirty}
            className="bg-brand-gold hover:bg-brand-gold-hover text-white font-bold text-[14px] h-12 px-8 rounded-xl shadow-sm transition-all border-none disabled:opacity-50 min-w-40"
          >
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Save changes"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              if (userData?.data?.profile) {
                setPreviewUrl(userData.data.profile);
              } else {
                setPreviewUrl(null);
              }
            }}
            disabled={!isDirty}
            className="bg-white hover:bg-gray-50 text-gray-600 font-bold text-[14px] h-12 px-8 rounded-xl border border-gray-200 shadow-sm transition-all disabled:opacity-50"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
