/** @jsxImportSource @emotion/react */
import { _, __ } from 'chainedcss'

export function hero() {
  return _.font(800).text3xl().leading`1`.text`#333`
    .md(__.text4xl().oss)
    .lg(__.text5xl().leading`1`.oss)
}
export const p_sub = () => _.font(400).textLg().leading`160%`.text`#445577`

export function h_2() {
  return _.font(700)
    .text2xl()
    .md(__.text4xl().oss)
    .lg(__.leading`1`)
}

export function h_3() {
  return _.font(900)
    .textXl()
    .md(__.text2xl().oss)
    .lg(__.leading`1`.oss)
}

export function h_4() {
  return _.font(700)
    .textLg()
    .md(__.textXl().oss)
    .lg(__.leading`1`.oss).text`#445577`
}

export const cap = () => _.text(14).tracking`0.2em`
export const cap_thin = () => _.cap().font(400).text`#445577`
export const cap_thick = () => _.cap().font(900).text`#445577`

export function p_base() {
  return _.textBase().md(__.textLg().oss).lg(__.textXl().oss).font(400).mb2()
}

export function p_sm() {
  return _.textSm()
    .md(__.textSm().oss)
    .font(500)
    .lg(__.leading`160%`.oss)
}

export function p_xl() {
  return _.textBase().md(__.textLg().oss).lg(__.textXl().oss).font(400)
    .text`#445577`.lg(__.leading`160%`.oss)
}

export function p_tag() {
  return _.textBase().md(__.textBase().oss).lg(__.textLg().oss).font(600)
    .text`#445577`.lg(__.leading`160%`.oss)
}

export const p_btn_1 = () => _.textSm().md(__.textBase().oss).font(600).oss

export const p_btn_2 = () => _.textSm().md(__.textBase().oss).font(600).oss

export const mb_2 = () => _.mb2().md(__.mb4().oss).lg(__.mb6().oss)

export const mb_3 = () => _.mb3().md(__.mb6().oss).lg(__.mb8().oss)

export function latestGameStories() {
  return _.text(15).text`#555`.font(400).leading`26px`.tracking`1px`
}
