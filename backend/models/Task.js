const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ['urgent', 'important', 'normal'], default: 'normal' },
    status: { type: String, enum: ['todo', 'inprogress', 'done'], default: 'todo' },
    tags: [String],
    dueDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    editedAt: { type: Date }, // Ensure this field is included
});


module.exports = mongoose.model('Task', TaskSchema);
