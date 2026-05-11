export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const VALID = Netlify.env.get('ACCESS_PIN');
  if (!VALID) {
    console.error('ACCESS_PIN env var no configurada en Netlify');
    return Response.json({ ok: false, msg: 'Servicio no configurado. Contacte al administrador.' }, { status: 503 });
  }
  const { pin } = await req.json();
  if (pin === VALID) {
    const token = btoa(VALID + ':reclamos');
    return Response.json({ ok: true, token });
  }
  return Response.json({ ok: false, msg: 'PIN incorrecto' }, { status: 401 });
};
export const config = { path: '/api/auth' };
