const Header = ({header}) => <h1>{header}</h1>

const Content = ({parts}) =>
    <div>
        {parts.map(({name, exercises}) =>
        <p key={name}>
            {name} {exercises}
        </p>
    )}
    </div>

const Total = (props) => {
    const initialValue = 0
    const total = props.parts.reduce((previousValue,parts) => {
        // console.log(previousValue, 'mitä', parts)
        return previousValue + parts.exercises
    }, initialValue)
    return (
        <div>
            <b>total of {total} exercises</b>
        </div>
    )
}

const Course = ({courses}) => {
    return (
        <>
        {courses.map(course =>
            <div key={course.id}>
                <Header header={course.name} />
                <Content name={course.name} parts={course.parts} />
                <Total parts={course.parts} />
            </div>
        )}
        </>
    )
}

export default Course
