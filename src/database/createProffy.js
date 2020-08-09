// Exportado do test.js
// await na function somente se tiver async
module.exports = async function(db, {proffyValue, classValue, classScheduleValues}) {
    // Inserir dados na table de teachers
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );

    `)

    const proffy_id = insertedProffy.lastID

    // Inserir dados na tablea classes

    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)

    const class_id = insertedClass.lastID

    // Inserir dados na tabela class_schedule
    const insertedAllClassScheduleValues = classScheduleValues.map((classSchecduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classSchecduleValue.weekday}",
                "${classSchecduleValue.time_from}",
                "${classSchecduleValue.time_to}"
            );
        `)
    })

    // aqui vou executar todos os db.run() das class_schedule
    await Promise.all(insertedAllClassScheduleValues)

}