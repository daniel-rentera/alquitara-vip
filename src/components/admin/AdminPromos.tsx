import { useEffect, useState, useCallback } from 'react'
import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import Modal from '../Modal'
import { supabase } from '../../lib/supabase'
import type { Promo } from '../../lib/types'

const empty = {
  title: '',
  description: '',
  price: '' as string,
  old_price: '' as string,
  badge: '',
  includes: '',
  is_active: true,
}

export default function AdminPromos() {
  const [promos, setPromos] = useState<Promo[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Promo | null>(null)
  const [form, setForm] = useState({ ...empty })
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    if (!supabase) return
    setLoading(true)
    const { data } = await supabase.from('promos').select('*').order('created_at', { ascending: false })
    setPromos((data as Promo[]) ?? [])
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
  const openEdit = (p: Promo) => {
    setEditing(p)
    setForm({
      title: p.title,
      description: p.description ?? '',
      price: p.price?.toString() ?? '',
      old_price: p.old_price?.toString() ?? '',
      badge: p.badge ?? '',
      includes: (p.includes ?? []).join('\n'),
      is_active: p.is_active,
    })
    setOpen(true)
  }

  const save = async () => {
    if (!supabase || !form.title.trim()) return
    setSaving(true)
    const payload = {
      title: form.title,
      description: form.description || null,
      price: form.price ? Number(form.price) : null,
      old_price: form.old_price ? Number(form.old_price) : null,
      badge: form.badge || null,
      includes: form.includes
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      is_active: form.is_active,
    }
    if (editing) await supabase.from('promos').update(payload).eq('id', editing.id)
    else await supabase.from('promos').insert(payload)
    setSaving(false)
    setOpen(false)
    load()
  }

  const remove = async (id: string) => {
    if (!supabase || !confirm('¿Eliminar esta promoción?')) return
    await supabase.from('promos').delete().eq('id', id)
    load()
  }
  const toggle = async (p: Promo) => {
    if (!supabase) return
    await supabase.from('promos').update({ is_active: !p.is_active }).eq('id', p.id)
    load()
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-white/55">{promos.length} promociones</p>
        <button onClick={openNew} className="btn-primary px-5 py-2 text-sm">
          <Plus className="h-4 w-4" /> Nueva promo
        </button>
      </div>

      {loading ? (
        <div className="grid min-h-[20vh] place-items-center">
          <Loader2 className="h-7 w-7 animate-spin text-neon" />
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {promos.map((p) => (
            <div key={p.id} className={`glass flex items-start gap-4 rounded-2xl p-4 ${!p.is_active && 'opacity-50'}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {p.badge && <span className="rounded-md bg-grape-gold px-2 py-0.5 text-[10px] font-bold uppercase text-white">{p.badge}</span>}
                  <h4 className="font-semibold text-white">{p.title}</h4>
                </div>
                <p className="mt-1 text-sm gold-text font-bold">{p.price != null ? `S/ ${p.price}` : 'Consultar'}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggle(p)} className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 text-white/60 transition hover:bg-white/10">
                  {p.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
                <button onClick={() => openEdit(p)} className="grid h-9 w-9 place-items-center rounded-lg border border-neon/30 text-neon transition hover:bg-neon/10">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => remove(p.id)} className="grid h-9 w-9 place-items-center rounded-lg border border-magenta/30 text-magenta transition hover:bg-magenta/10">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Editar promo' : 'Nueva promo'}>
        <div className="space-y-4">
          <div>
            <label className="label">Título</label>
            <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Ej. Box VIP" />
          </div>
          <div>
            <label className="label">Descripción</label>
            <textarea className="input min-h-[64px] resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="label">Precio S/</label>
              <input type="number" className="input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div>
              <label className="label">Antes S/</label>
              <input type="number" className="input" value={form.old_price} onChange={(e) => setForm({ ...form, old_price: e.target.value })} />
            </div>
            <div>
              <label className="label">Badge</label>
              <input className="input" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="TOP" />
            </div>
          </div>
          <div>
            <label className="label">Incluye (uno por línea)</label>
            <textarea className="input min-h-[90px] resize-none" value={form.includes} onChange={(e) => setForm({ ...form, includes: e.target.value })} placeholder={'Mesa para 6\n1 botella premium\nMixers'} />
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
