import {translate} from '@docusaurus/Translate';
import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';



function WorldArt() {
  return <svg className="world-art" viewBox="0 0 560 540" role="img" aria-labelledby="world-title">
    <title id="world-title">{translate({id: "site.a.smiling.world.surrounded.by.colorful.stars.and.voices", message: "A smiling world surrounded by colorful stars and voices"})}</title>
    <defs><clipPath id="planet"><circle cx="280" cy="275" r="165"/></clipPath></defs>
    <path d="M75 436Q270 480 481 432" stroke="#282e28" strokeWidth="2" fill="none"/>
    <circle cx="280" cy="275" r="165" fill="#a9c7e6" stroke="#282e28" strokeWidth="3"/>
    <g clipPath="url(#planet)" fill="#ccd78b" stroke="#282e28" strokeWidth="2.5">
      <path d="M139 133l93 3 26 44-24 31-48-4-20 42-51-7-25-47z"/>
      <path d="m201 287 62 13 29 49-18 47-39 50-29-57-29-49z"/>
      <path d="m319 109 63 28-8 41 43 18 44 53-39 23-56-20-25 39-41-27 21-49-31-41z"/>
      <path d="m381 339 54 17 17 48-65 12-30-33z"/>
    </g>
    <path d="M254 275v13m52-13v13m-53 27q26 27 52-1" fill="none" stroke="#282e28" strokeWidth="6" strokeLinecap="round"/>
    <path d="m66 99 13 26 29 4-21 21 5 29-26-14-26 14 5-29-21-21 29-4z" fill="#efbc48" stroke="#282e28" strokeWidth="2"/>
    <path d="m469 340 10 20 23 3-17 16 4 24-20-11-21 11 4-24-17-16 23-3z" fill="#ee6543" stroke="#282e28" strokeWidth="2"/>
    <g transform="rotate(10 429 105)"><rect x="361" y="61" width="140" height="73" rx="25" fill="#ee6543" stroke="#282e28" strokeWidth="2"/><path d="m391 134-11 24 35-24" fill="#ee6543" stroke="#282e28" strokeWidth="2"/><text x="431" y="107" textAnchor="middle" fontSize="18" fontWeight="700" fill="#282e28">{translate({id: "site.hello.world", message: "hello, world!"})}</text></g>
    <path d="m75 305-23-9m24 31-27 5m407-123 23-17m-19 39 28-2" stroke="#282e28" strokeWidth="3" strokeLinecap="round"/>
    <ellipse cx="285" cy="481" rx="111" ry="12" fill="#282e28" opacity=".08"/>
  </svg>;
}

export default function Home() {
  const priorities = [
  ['01', translate({id: "site.a.voice.that.counts", message: "A voice that counts."}), translate({id: "site.children.deserve.to.be.heard.in.the.decisions.that.shape.their.lives", message: "Children deserve to be heard in the decisions that shape their lives."}), 'voice'],
  ['02', translate({id: "site.room.to.grow", message: "Room to grow."}), translate({id: "site.learning.play.care.and.a.safe.place.to.call.home.should.belong.to.every.child", message: "Learning, play, care, and a safe place to call home should belong to every child."}), 'grow'],
  ['03', translate({id: "site.a.world.to.inherit", message: "A world to inherit."}), translate({id: "site.a.peaceful.livable.planet.is.part.of.a.childhood.and.a.future.worth.protecting", message: "A peaceful, livable planet is part of a childhood—and a future—worth protecting."}), 'world'],
];
  return <Layout title={translate({id: "site.our.lives.our.voices.our.world", message: "Our lives. Our voices. Our world."})} description={translate({id: "site.the.children.s.international.is.a.political.party.that.defends.the.rights.of.children.everywhere", message: "The Children’s International is a political party that defends the rights of children everywhere."})}>
    <main>
      <section className="hero-section page-width">
        <div className="hero-copy"><span className="eyebrow"><span className="status-dot"/> {translate({id: "site.small.voices.big.possibilities", message: "SMALL VOICES. BIG POSSIBILITIES."})}</span>
          <h1>{translate({id: "site.our.lives", message: "Our lives."})}<br/>{translate({id: "site.our.voices", message: "Our voices."})}<br/><span>{translate({id: "site.our.world", message: "Our world."})}</span></h1>
          <p>{translate({id: "site.a.better.world.begins.with.listening.to.children.we.re.a.political.party.standing.up.for.their.rights.everywhere", message: "A better world begins with listening to children. We’re a political party standing up for their rights. Everywhere."})}</p>
          <div className="hero-actions"><Link className="pill primary" to="/about/our-purpose">{translate({id: "site.meet.the.movement", message: "Meet the movement"})} <span>↗</span></Link><Link className="text-link" to="/about/our-priorities">{translate({id: "site.what.we.stand.for", message: "What we stand for"})} <span>→</span></Link></div>
        </div>
        <div className="hero-visual"><WorldArt/><span className="art-caption">{translate({id: "site.a.little.imagination.a.world.of.possibility", message: "A little imagination. A world of possibility."})}</span></div>
      </section>
      <div className="belief-strip"><span>{translate({id: "site.every.child", message: "EVERY CHILD."})}</span><span aria-hidden="true">✳</span><span>{translate({id: "site.every.voice", message: "EVERY VOICE."})}</span><span aria-hidden="true">✳</span><span>{translate({id: "site.everywhere", message: "EVERYWHERE."})}</span><span aria-hidden="true">✳</span></div>
      <section className="featured-video page-width" aria-labelledby="featured-video-title">
        <h2 id="featured-video-title">{translate({id: 'site.video.heading', message: 'Watch the video'})}</h2>
        <div className="video-player">
          <iframe
            src="https://www.youtube-nocookie.com/embed/oOqb7QTSU-w"
            title={translate({id: 'site.video.title', message: 'Featured YouTube video'})}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <a className="text-link" href="https://youtu.be/oOqb7QTSU-w" target="_blank" rel="noopener noreferrer">
          {translate({id: 'site.video.youtube', message: 'Watch on YouTube ↗'})}
        </a>
      </section>
      <section className="priorities page-width"><div className="section-heading"><div><span className="eyebrow">{translate({id: "site.what.we.stand.for.heading", message: "WHAT WE STAND FOR"})}</span><h2>{translate({id: "site.childhood.is.not.a.waiting.room", message: "Childhood is not a waiting room."})}</h2></div><p>{translate({id: "site.children.are.part.of.our.world.today", message: "Children are part of our world today."})}<br/>{translate({id: "site.their.rights.should.be.too", message: "Their rights should be, too."})}</p></div>
        <div className="priority-grid">{priorities.map(([number,title,copy,kind]) => <Link key={number} className={`priority-card ${kind}`} to="/about/our-priorities"><div className="card-top"><span>{number} /</span><span aria-hidden="true">↗</span></div><h3>{title}</h3><p>{copy}</p></Link>)}</div>
      </section>
      <section className="invitation page-width"><span className="eyebrow">{translate({id: "site.a.future.we.shape.together", message: "A FUTURE WE SHAPE TOGETHER"})}</span><h2>{translate({id: "site.there.s.room.for.your.voice", message: "There’s room for your voice."})}</h2><p>{translate({id: "site.change.starts.with.a.conversation.explore.our.purpose.share.an.idea.and.help.put.children.s.rights.at.the.heart.of.public.life", message: "Change starts with a conversation. Explore our purpose, share an idea, and help put children’s rights at the heart of public life."})}</p><Link className="pill primary" to="/community">{translate({id: "site.find.your.way.to.take.part", message: "Find your way to take part"})} <span>↗</span></Link></section>
    </main>
  </Layout>;
}
