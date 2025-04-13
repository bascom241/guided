import { useEffect } from 'react'
import { useCourseStore } from '../../store/useCourseStore'
import { useParams } from 'react-router-dom';
import CourseDetailBanner from '../components/CourseDetailComponent';
const CourseDetail = () => {

  const { courseId } = useParams();
  console.log(courseId)
  const { getCourse,singleCourseContainer} = useCourseStore();
  useEffect(() => {
    getCourse(courseId)
  }, [getCourse])

  console.log(singleCourseContainer)
console.log(singleCourseContainer?.videos)
  return (
    <div>

      {singleCourseContainer && (
        <CourseDetailBanner
          singleCourseContainer={singleCourseContainer}
        />
      )}
    
    </div>
  )
}

export default CourseDetail
