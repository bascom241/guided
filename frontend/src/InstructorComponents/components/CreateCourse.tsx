import  { useEffect, useState } from 'react'
import { useAuthStore } from '../../../store/useAuthStore';
import toast from 'react-hot-toast';
import { useCourseStore } from '../../../store/useCourseStore';
import { ArrowLeft, ArrowRight,  FileVideo, Image } from 'lucide-react';
import {Loader} from 'lucide-react'

const CreateCourse = () => {
  const [step, setStep] = useState(1);
  const [tittle, setTittle] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState(0);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [videos, setVideos] = useState<File[] | null>([]);
  const [videoDetails, setVideosDetails] = useState<{ title: string, duration: number, description: string }[]>([]);

  const { authUser } = useAuthStore() as unknown as { authUser: { user: any } };
  const { creatingCourse, createCourses, getCategories, categoriesContainer } = useCourseStore();
  const userId = authUser?.user._id;

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setThumbnail(e.target.files[0]);
    }
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedVideos = Array.from(e.target.files);
      setVideos(selectedVideos);

      const videoDetails = selectedVideos.map(video => ({
        title: video.name,
        duration: 0,
        description: ""
      }));

      setVideosDetails(videoDetails);
    }
  }

  const handleVideosTittleChange = (index: number, field: "title" | "duration" | "description", value: string | number) => {
    const updatedDetails = [...videoDetails];
    updatedDetails[index] = { ...updatedDetails[index], [field]: value };
    setVideosDetails(updatedDetails);
  }

  const validatDetails = () => {
    if (!tittle) return toast.error("Course Title is Required");
    if (!category) return toast.error("Course Category is Required");
    if (!description) return toast.error("Course Description is Required");
    if (!duration) return toast.error("Course Duration is Required");
    if (!level) return toast.error("Course Level is Required");
    if (!price) return toast.error("Course Price is Required");
    if (!thumbnail) return toast.error("Course Thumbnail is Required");
    if (videos?.length === 0) return toast.error("Course videos is Required");

    return true;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const success = validatDetails();

    if (success === true) {
      const formData:any = new FormData();

      formData.append("tittle", tittle);
      formData.append("description", description);
      formData.append("duration", duration.toString());
      formData.append("category", category);
      formData.append("price", price.toString());
      formData.append("level", level);

      if (thumbnail) formData.append("thumbnail", thumbnail);
      videos?.forEach(videos => formData.append("videos", videos));
      formData.append("videoDetails", JSON.stringify(videoDetails));

      createCourses(formData, userId)
    }
  }

  const nextStep = () => {
    setStep((prev) => prev + 1);
  }

  const prevStep = () => {
    setStep((prev) => prev - 1);
  }

  useEffect(() => {
    getCategories();
  }, [])

  return (
    <div className="w-full p-4 md:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                {stepNumber}
              </div>
              <span className={`mt-2 text-sm ${step >= stepNumber ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                {stepNumber === 1 ? 'Details' : stepNumber === 2 ? 'Pricing' : 'Media'}
              </span>
            </div>
          ))}
        </div>

        <h1 className='text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white'>Create Your Course</h1>
        
        <form onSubmit={handleSubmit} className='space-y-6'>
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label htmlFor='tittle' className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Course Title</label>
                <input
                  id='tittle'
                  placeholder='What is Your Course Title'
                  value={tittle}
                  onChange={(evt) => setTittle(evt.target.value)}
                  className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500'
                />
              </div>

              <div>
                <label htmlFor='description' className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Course Description</label>
                <textarea
                  id='description'
                  placeholder='What is your Course description?'
                  value={description}
                  onChange={(evt) => setDescription(evt.target.value)}
                  rows={4}
                  className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500'
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor='category' className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select
                    id='category'
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500'
                  >
                    <option value="">Select a Category</option>
                    {Object.keys(categoriesContainer).map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {category && categoriesContainer[category].length > 0 && (
                  <div>
                    <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subcategory</label>
                    <select
                      id="subCategory"
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a Subcategory</option>
                      {categoriesContainer[category].map((subCat) => (
                        <option key={subCat} value={subCat}>
                          {subCat}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor='duration' className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Course Duration (hours)</label>
                  <input
                    id='duration'
                    placeholder='How long will the course take?'
                    type='number'
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>

                <div>
                  <label htmlFor='price' className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Course Price ($)</label>
                  <input
                    id='price'
                    placeholder='What is Your Course Price'
                    type='number'
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='level' className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Course Level</label>
                <select
                  id='level'
                  className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500'
                  onChange={(e) => setLevel(e.target.value)}
                  value={level}
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Course Thumbnail</label>
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Image className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG (MAX. 5MB)</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleThumbnailChange} 
                    className="hidden" 
                  />
                </label>
                {thumbnail && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Selected: {thumbnail.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Course Videos</label>
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileVideo className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">MP4, MOV (MAX. 100MB each)</p>
                  </div>
                  <input 
                    type="file" 
                    accept="video/*" 
                    onChange={handleVideoChange} 
                    multiple 
                    className="hidden" 
                  />
                </label>
                {videos && videos.length > 0 && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Selected {videos.length} video(s)
                  </p>
                )}
              </div>

              {videoDetails.length > 0 && (
                <div className="space-y-4 mt-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Video Details</h2>
                  {videoDetails.map((video, index) => (
                    <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                        <input
                          type='text'
                          value={video.title}
                          onChange={(e) => handleVideosTittleChange(index, "title", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (minutes)</label>
                          <input
                            type="number"
                            value={video.duration}
                            onChange={(e) => handleVideosTittleChange(index, "duration", Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                          <textarea
                            value={video.description}
                            onChange={(e) => handleVideosTittleChange(index, "description", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <ArrowLeft size={16} />
                Previous
              </button>
            ) : (
              <div></div> // Empty div to maintain space
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Next
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={creatingCourse}
                className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-green-400"
              >
                {creatingCourse ?   <Loader className="w-5 h-5 animate-spin" /> : 'Submit Course'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;