import { makeAutoObservable } from "mobx"
import { INotes } from "../types/notes"
import { notes, tags } from "../constants/data"


class NotesStore {
  notesArr: INotes[] = JSON.parse(localStorage.getItem('notes') as string) || notes
  tagArr = JSON.parse(localStorage.getItem('tag') as string) || tags
  constructor() {
    makeAutoObservable(this)
  }

  setNote(note: string) {
    if (note) {
      this.notesArr.push({
        note: note,
        id: new Date().toISOString()
      })
      localStorage.setItem('notes', JSON.stringify(this.notesArr))
    }
  }

  deleteNote(id: string, note: string) {
    const tag = note.split(' ').filter((item: string) => {
      if (item[0] === '#') {
        return item
      }
    })
    const uniqTagArr = [...new Set(tag)]
    uniqTagArr.map(item => {
      const index = this.tagArr.findIndex(itemTag => itemTag.name === item)
      if (this.tagArr[index].count > 1) {
        this.tagArr[index].count--
      } else {
        this.tagArr.splice(index, 1)
      } 
    })

    this.notesArr = this.notesArr.filter((item: INotes) => item.id !== id)
    localStorage.setItem('tag', JSON.stringify(this.tagArr))
    localStorage.setItem('notes', JSON.stringify(this.notesArr))
  }

  editNote(id: string, newNote: string) {
    const index = this.notesArr.findIndex((item: INotes) => item.id === id)

    const oldTags = this.notesArr[index].note.split(' ').filter(item => item[0] === '#')
    const newTagsArr = newNote.split(' ').filter(item => item[0] === '#')
    const newTag = newTagsArr.filter(item => !oldTags.includes(item))
    const uniqTagsArr = [...new Set(newTagsArr)]
    const uniqOldTagsArr = [...new Set(oldTags)]

    uniqOldTagsArr.map(item => {
      if (!uniqTagsArr.includes(item)) {
        const indexTag = this.tagArr.findIndex(itemTag => itemTag.name === item)
        this.tagArr[indexTag].count--
        if (!this.tagArr[indexTag].count) {
          this.tagArr.splice(indexTag, 1)
        }
      }
    })
    newTag.map(item => {
      const indexTag = this.tagArr.findIndex(itemTag => itemTag.name === item)
      if (indexTag === -1) {
        this.tagArr.push({
          name: item,
          count: 1
        })
      } else {
        this.tagArr[indexTag].count++
      }
    })
    this.notesArr[index].note = newNote

    localStorage.setItem('notes', JSON.stringify(this.notesArr))
    localStorage.setItem('tag', JSON.stringify(this.tagArr))
  }

  setTag(tag: string) {
    const arr = tag.split(' ')
    const uniqArr = [...new Set(arr)]
    uniqArr.map((item: string) => {
      if (item[0] === '#') {
        const index = this.tagArr.findIndex(itemTag => itemTag.name === item)
        if (index === -1) {
          this.tagArr.push({
            name: item,
            count: 1
          })
        } else {
          this.tagArr[index].count++
        }

      }
    })
    localStorage.setItem('tag', JSON.stringify(this.tagArr))
  }
}

export default new NotesStore()