import { useEffect, useState, useCallback } from 'react'
import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import Modal from '../Modal'
import { supabase } from '../../lib/supabase'
import { DAYS } from '../../lib/types'
import type { EventItem } from '../../lib/types'

const empty = {
  title: '',
  description: '',
  day_of_week: 5,
  start_time: '16:00',
  tag: '',
  is_active: true,
}

export default function AdminEvents() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<EventItem | null>(null)
  const [form, setForm] = useState({ ...empty })
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    if (!supabase) return
    setLoading(true)
    const { data } = await supabase.from('events').select('*').order('day_of_week')
    setEvents((data as EventItem[]) ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const openNew = () => {
    setEditing(null)
    setForm({ ...empty })
    setOpen(true)
  }
  const openEdit = (ev: EventItem) => {
    setEditing(ev)
    setForm({
      title: ev.title,
      description: ev.description ?? '',
      day_of_week: ev.day_of_week,
      start_time: ev.start_time ?? '16:00',
      tag: ev.tag ?? '',
      is_active: ev.is_active,
    })
    setOpen(true)
  }

  const save = async () => {
    if (!supabase || !form.title.trim()) return
    setSaving(true)
    if (editing) {
      await supabase.from('events').update(form).eq('id', editing.id)
    } else {
      await supabase.from('events').insert(form)
    }
    setSaving(false)
    setOpen(false)
    load()
  }

  const remove = async (id: string) => {
    if (!supabase || !confirm('¿Eliminar este evento?')) return
    await supabase.from('events').delete().eq('id', id)
    load()
  }

  const toggle = async (ev: EventItem) => {
    if (!supabase) return
    await supabase.from('events').update({ is_active: !ev.is_active }).eq('id', ev.id)
    load()
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-white/55">{events.length} eventos en el cronograma</p>
        <button onClick={openNew} className="btn-primary px-5 py-2 text-sm">
          <Plus className="h-4 w-4" /> Nuevo evento
        </button>
      </div>

      {loading ? (
        <div className="grid min-h-[20vh] place-items-center">
          <Loader2 className="h-7 w-7 animate-spin text-neon" />
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((ev) => (
            <div key={ev.id} className={`glass flex flex-wrap items-center gap-4 rounded-2xl p-4 ${!ev.is_active && 'opacity-50'}`}>
              <span className="w-24 shrink-0 text-xs font-bold uppercase tracking-widest text-gold">
                {DAYS[ev.day_of_week]}
              </span>
              <div className="min-w-[160px] flex-1">
                <h4 className="font-semibold text-white">{ev.title}</h4>
                {ev.tag && <span className="text-xs text-pinky">{ev.tag}</span>}
              </div>
              <span className="text-sm text-white/50">{ev.start_time}</span>
              <div className="flex gap-2">
                <button onClick={() => toggle(ev)} title={ev.is_active ? 'Ocultar' : 'Mostrar'} className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-white/60 transition hover:bg-white/10">
                  {ev.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
                <button onClick={() => openEdit(ev)} className="grid h-9 w-9 place-items-center rounded-lg border border-neon/30 text-neon transition hover:bg-neon/10">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => remove(ev.id)} className="grid h-9 w-9 place-items-center rounded-lg border border-magenta/30 text-magenta transition hover:bg-magenta/10">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Editar evento' : 'Nuevo evento'}>
        <div className="space-y-4">
          <div>
            <label className="label">Título</label>
            <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Ej. Viernes de Reventón" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Día</label>
              <select className="input" value={form.day_of_week} onChange={(e) => setForm({ ...form, day_of_week: Number(e.target.value) })}>
                {DAYS.map((d, i) => (
                  <option key={i} value={i}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Hora (Open Door)</label>
              <input className="input" value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} placeholder="16:00" />
            </div>
          </div>
          <div>
            <label className="label">Etiqueta</label>
            <input className="input" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} placeholder="Ej. DJ en vivo" />
          </div>
          <div>
            <label className="label">Descripción</label>
            <textarea className="input min-h-[72px] resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <label className="flex items-center gap-2 text-sm text-white/70">
            <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="h-4 w-4 accent-neon" />
            Visible en el sitio
          </label>
          <button onClick={save} disabled={saving} className="btn-primary w-full disabled:opacity-50">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Guardar'}
          </button>
        </div>
      </Modal>
    </div>
  )
}
