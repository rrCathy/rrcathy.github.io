import{St as e,Tt as t,d as n,n as r,r as i,s as a,t as o,u as s,xt as c}from"./texify-BbDWsXHu.js";import{D as l,F as u,I as d,M as f,N as p,O as m,P as h,a as g,b as _,c as v,d as y,f as b,h as x,i as S,l as C,n as w,o as T,p as E,t as D,v as O,y as k}from"./extends-CvwVrpS_.js";import{t as ee}from"./OrbitControls-C_2pK65T.js";var te=parseInt(`184`.replace(/\D+/g,``)),ne=te>=125?`uv1`:`uv2`,re=new T,A=new h,j=class extends y{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type=`LineSegmentsGeometry`,this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute(`position`,new C([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute(`uv`,new C([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new b(t,6,1);return this.setAttribute(`instanceStart`,new E(n,3,0)),this.setAttribute(`instanceEnd`,new E(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));let r=new b(n,t*2,1);return this.setAttribute(`instanceColorStart`,new E(r,t,0)),this.setAttribute(`instanceColorEnd`,new E(r,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new d(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new T);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),re.setFromBufferAttribute(t),this.boundingBox.union(re))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new m),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,a=e.count;i<a;i++)A.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(A)),A.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(A));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.`,this)}}toJSON(){}applyMatrix(e){return console.warn(`THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4().`),this.applyMatrix4(e)}},M=class extends j{constructor(){super(),this.isLineGeometry=!0,this.type=`LineGeometry`}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setPositions(n),this}setColors(e,t=3){let n=e.length-t,r=new Float32Array(2*n);if(t===3)for(let i=0;i<n;i+=t)r[2*i]=e[i],r[2*i+1]=e[i+1],r[2*i+2]=e[i+2],r[2*i+3]=e[i+3],r[2*i+4]=e[i+4],r[2*i+5]=e[i+5];else for(let i=0;i<n;i+=t)r[2*i]=e[i],r[2*i+1]=e[i+1],r[2*i+2]=e[i+2],r[2*i+3]=e[i+3],r[2*i+4]=e[i+4],r[2*i+5]=e[i+5],r[2*i+6]=e[i+6],r[2*i+7]=e[i+7];return super.setColors(r,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}},N=class extends l{constructor(e){super({type:`LineMaterial`,uniforms:f.clone(f.merge([g.common,g.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new p(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${te>=154?`colorspace_fragment`:`encodings_fragment`}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA=`1`:delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return`WORLD_UNITS`in this.defines},set:function(e){e===!0?this.defines.WORLD_UNITS=``:delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return`USE_DASH`in this.defines},set(e){!!e!=`USE_DASH`in this.defines&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH=``:delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return`USE_ALPHA_TO_COVERAGE`in this.defines},set:function(e){!!e!=`USE_ALPHA_TO_COVERAGE`in this.defines&&(this.needsUpdate=!0),e===!0?(this.defines.USE_ALPHA_TO_COVERAGE=``,this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}},P=new u,F=new h,ie=new h,I=new u,L=new u,R=new u,ae=new h,oe=new k,z=new x,se=new h,B=new T,V=new m,H=new u,U,W;function ce(e,t,n){return H.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),H.multiplyScalar(1/H.w),H.x=W/n.width,H.y=W/n.height,H.applyMatrix4(e.projectionMatrixInverse),H.multiplyScalar(1/H.w),Math.abs(Math.max(H.x,H.y))}function le(e,t){let n=e.matrixWorld,r=e.geometry,i=r.attributes.instanceStart,a=r.attributes.instanceEnd,o=Math.min(r.instanceCount,i.count);for(let r=0,s=o;r<s;r++){z.start.fromBufferAttribute(i,r),z.end.fromBufferAttribute(a,r),z.applyMatrix4(n);let o=new h,s=new h;U.distanceSqToSegment(z.start,z.end,s,o),s.distanceTo(o)<W*.5&&t.push({point:s,pointOnLine:o,distance:U.origin.distanceTo(s),object:e,face:null,faceIndex:r,uv:null,[ne]:null})}}function ue(e,t,n){let r=t.projectionMatrix,i=e.material.resolution,a=e.matrixWorld,o=e.geometry,s=o.attributes.instanceStart,c=o.attributes.instanceEnd,l=Math.min(o.instanceCount,s.count),u=-t.near;U.at(1,R),R.w=1,R.applyMatrix4(t.matrixWorldInverse),R.applyMatrix4(r),R.multiplyScalar(1/R.w),R.x*=i.x/2,R.y*=i.y/2,R.z=0,ae.copy(R),oe.multiplyMatrices(t.matrixWorldInverse,a);for(let t=0,o=l;t<o;t++){if(I.fromBufferAttribute(s,t),L.fromBufferAttribute(c,t),I.w=1,L.w=1,I.applyMatrix4(oe),L.applyMatrix4(oe),I.z>u&&L.z>u)continue;if(I.z>u){let e=I.z-L.z,t=(I.z-u)/e;I.lerp(L,t)}else if(L.z>u){let e=L.z-I.z,t=(L.z-u)/e;L.lerp(I,t)}I.applyMatrix4(r),L.applyMatrix4(r),I.multiplyScalar(1/I.w),L.multiplyScalar(1/L.w),I.x*=i.x/2,I.y*=i.y/2,L.x*=i.x/2,L.y*=i.y/2,z.start.copy(I),z.start.z=0,z.end.copy(L),z.end.z=0;let o=z.closestPointToPointParameter(ae,!0);z.at(o,se);let l=O.lerp(I.z,L.z,o),d=l>=-1&&l<=1,f=ae.distanceTo(se)<W*.5;if(d&&f){z.start.fromBufferAttribute(s,t),z.end.fromBufferAttribute(c,t),z.start.applyMatrix4(a),z.end.applyMatrix4(a);let r=new h,i=new h;U.distanceSqToSegment(z.start,z.end,i,r),n.push({point:i,pointOnLine:r,distance:U.origin.distanceTo(i),object:e,face:null,faceIndex:t,uv:null,[ne]:null})}}}var de=class extends _{constructor(e=new j,t=new N({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type=`LineSegments2`}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,a=t.count;e<a;e++,i+=2)F.fromBufferAttribute(t,e),ie.fromBufferAttribute(n,e),r[i]=i===0?0:r[i-1],r[i+1]=r[i]+F.distanceTo(ie);let i=new b(r,2,1);return e.setAttribute(`instanceDistanceStart`,new E(i,1,0)),e.setAttribute(`instanceDistanceEnd`,new E(i,1,1)),this}raycast(e,t){let n=this.material.worldUnits,r=e.camera;r===null&&!n&&console.error(`LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.`);let i=e.params.Line2===void 0?0:e.params.Line2.threshold||0;U=e.ray;let a=this.matrixWorld,o=this.geometry,s=this.material;W=s.linewidth+i,o.boundingSphere===null&&o.computeBoundingSphere(),V.copy(o.boundingSphere).applyMatrix4(a);let c;if(c=n?W*.5:ce(r,Math.max(r.near,V.distanceToPoint(U.origin)),s.resolution),V.radius+=c,U.intersectsSphere(V)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),B.copy(o.boundingBox).applyMatrix4(a);let l;l=n?W*.5:ce(r,Math.max(r.near,B.distanceToPoint(U.origin)),s.resolution),B.expandByScalar(l),U.intersectsBox(B)!==!1&&(n?le(this,t):ue(this,r,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(P),this.material.uniforms.resolution.value.set(P.z,P.w))}},fe=class extends de{constructor(e=new M,t=new N({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type=`Line2`}},G=t(e()),pe=G.forwardRef(function({points:e,color:t=16777215,vertexColors:n,linewidth:r,lineWidth:i,segments:a,dashed:o,...s},c){var l;let d=S(e=>e.size),f=G.useMemo(()=>a?new de:new fe,[a]),[m]=G.useState(()=>new N),g=(n==null||(l=n[0])==null?void 0:l.length)===4?4:3,_=G.useMemo(()=>{let r=a?new j:new M,i=e.map(e=>{let t=Array.isArray(e);return e instanceof h||e instanceof u?[e.x,e.y,e.z]:e instanceof p?[e.x,e.y,0]:t&&e.length===3?[e[0],e[1],e[2]]:t&&e.length===2?[e[0],e[1],0]:e});if(r.setPositions(i.flat()),n){t=16777215;let e=n.map(e=>e instanceof v?e.toArray():e);r.setColors(e.flat(),g)}return r},[e,a,n,g]);return G.useLayoutEffect(()=>{f.computeLineDistances()},[e,f]),G.useLayoutEffect(()=>{o?m.defines.USE_DASH=``:delete m.defines.USE_DASH,m.needsUpdate=!0},[o,m]),G.useEffect(()=>()=>{_.dispose(),m.dispose()},[_]),G.createElement(`primitive`,D({object:f,ref:c},s),G.createElement(`primitive`,{object:_,attach:`geometry`}),G.createElement(`primitive`,D({object:m,attach:`material`,color:t,vertexColors:!!n,resolution:[d.width,d.height],linewidth:r??i??1,dashed:o,transparent:g===4},s)))}),K=[`a`,`b`,`c`],q=100;function me(e,t=.5){return t**(e-1)*q}function he(e,t){return t?`${K[e]}⁻¹`:K[e]}function J(e,t,n){let r=0,i=0,a=K[t];for(;i<e.length;)e.startsWith(n,i)?(--r,i+=n.length):e.startsWith(a,i)?(r+=1,i+=a.length):i++;return r}var ge=[{dx:1,dy:0,dz:0},{dx:-1,dy:0,dz:0},{dx:0,dy:-1,dz:0},{dx:0,dy:1,dz:0}],_e=[{dx:1,dy:0,dz:0},{dx:-1,dy:0,dz:0},{dx:0,dy:1,dz:0},{dx:0,dy:-1,dz:0},{dx:0,dy:0,dz:1},{dx:0,dy:0,dz:-1}];function ve(e,t){let n=[];for(let t=0;t<e;t++)n.push(K[t]),n.push(he(t,!0));let r=2*e,i=e<=2?ge:_e,a=[{id:`e`,label:`e`,depth:0,x:0,y:0,z:0,dir:-1,parent:-1}],o=[],s=new Set([`0,0,0`]),c=0;for(;c<a.length;){let e=a[c];if(c++,!(e.depth>=t))for(let t=0;t<r;t++){if(e.dir!==-1&&t===(e.dir%2==0?e.dir+1:e.dir-1))continue;let r=me(e.depth+1),l=e.x+i[t].dx*r,u=e.y+i[t].dy*r,d=e.z+i[t].dz*r,f=`${l},${u},${d}`;if(s.has(f))continue;s.add(f);let p=a.length;a.push({id:`w${p}`,label:e.label===`e`?n[t]:e.label+n[t],depth:e.depth+1,x:l,y:u,z:d,dir:t,parent:c-1}),o.push({from:c-1,to:p,d:t,isTree:!0})}}let l=e===1?`line`:e===3?`tree3d`:`tree`;if(l===`line`)for(let e of a)e.x=J(e.label,0,`a⁻¹`)*q,e.y=0,e.z=0;return{nodes:a,edges:o,layout:l,genCount:e,isInfinite:!0}}function Y(e,t){let n=e.trim();if(n===`e`||n===``)return``;let r=s(n,t),i=``;for(let e of r){let n=t[e.g]??`a`,r=`${n}⁻¹`;for(let t=0;t<Math.abs(e.e);t++)i+=e.e>0?n:r}return i}function ye(e,t){let n=[],r=0;for(;r<e.length;){let i=!1;for(let a of t){if(e.startsWith(`${a}⁻¹`,r)){n.push(`${a}⁻¹`),r+=a.length+2,i=!0;break}if(e.startsWith(a,r)){n.push(a),r+=a.length,i=!0;break}}i||r++}let i=[];for(let e of n){let t=e.endsWith(`⁻¹`)?e.slice(0,-2):`${e}⁻¹`;i.length>0&&i[i.length-1]===t?i.pop():i.push(e)}return i.join(``)}function X(e,t){let n=``,r=e.length-1;for(;r>=0;){let t=e[r];if(t===`¹`){let t=e[r-2];t!==void 0&&(n+=t),r-=3}else n+=t+`⁻¹`,--r}return n}function be(e,t,n){if(e===`e`||t===`e`)return!1;let r=e=>{let t=[],r=0;for(;r<e.length;){let i=!1;for(let a of n){if(e.startsWith(`${a}⁻¹`,r)){t.push(`${a}⁻¹`),r+=a.length+2,i=!0;break}if(e.startsWith(a,r)){t.push(a),r+=a.length,i=!0;break}}i||r++}return t},i=r(Y(e,n)),a=r(Y(t,n));if(i.length!==a.length||i.length===0)return!1;for(let e=0;e<i.length-1;e++){let t=[...i];if([t[e],t[e+1]]=[t[e+1],t[e]],t.join(``)===a.join(``))return!0}return!1}function xe(e,t){let n=-1,r=0,i=0;for(;i<e.length;){let a=-1,o=!1;for(let n=0;n<t.length;n++){if(e.startsWith(`${t[n]}⁻¹`,i)){a=n,o=!0;break}if(e.startsWith(t[n],i)){a=n;break}}if(a<0)return null;if(n===-1)n=a;else if(a!==n)return null;r+=o?-1:1,i+=o?t[n].length+2:t[n].length}return n<0?null:{g:n,k:Math.abs(r)}}function Se(e,t,n){if(t.length===0)return e;let r=``,i=0;for(;i<e.length;){let a=-1,o=!1;for(let t=0;t<n.length;t++){if(e.startsWith(`${n[t]}⁻¹`,i)){a=t,o=!0;break}if(e.startsWith(n[t],i)){a=t;break}}if(a<0){i++;continue}let s=o?n[a].length+2:n[a].length,c=o?-1:1;for(i+=s;i<e.length;){let t=!1,r=-1;for(let a=0;a<n.length;a++){if(e.startsWith(`${n[a]}⁻¹`,i)){r=a,t=!0;break}if(e.startsWith(n[a],i)){r=a;break}}if(r!==a)break;c+=t?-1:1,i+=t?n[a].length+2:n[a].length}let l=t[a];if(l&&l>0){let e=(c%l+l)%l;e!==0&&(r+=n[a].repeat(e))}else r+=o||c<0?`${n[a]}⁻¹`.repeat(Math.abs(c)):n[a].repeat(c)}return r}function Ce(e,t,n,r,i){let a=ve(e,n),o=K.slice(0,e),s=new Map;if(a.nodes.forEach((e,t)=>s.set(e.label,t)),r){let t=i&&i.length>=e?i.slice(0,e):r.generators.map(e=>e.apply(r.identity)),n=new Map(r.elements.map((e,t)=>[e.id,t])),c=[],l=i=>{if(i===`e`)return n.get(r.identity.id)??0;let a=r.identity,s=0;for(;s<i.length;){let c=-1,l=!1;for(let t=0;t<e;t++){if(i.startsWith(`${o[t]}⁻¹`,s)){c=t,l=!0;break}if(i.startsWith(o[t],s)){c=t;break}}if(c<0){s++;continue}let u=l?r.inverse(t[c]):t[c];if(!u)return n.get(r.identity.id)??0;a=r.multiply(a,u),s+=l?o[c].length+2:o[c].length}return n.get(a.id)??0};for(let e of a.nodes){let t=l(e.label),n=e.label.includes(`⁻¹`),r=c[t];if(r===void 0)c[t]=s.get(e.label);else{let i=a.nodes[r];(!n&&i.label.includes(`⁻¹`)||n===i.label.includes(`⁻¹`)&&e.label.length<i.label.length)&&(c[t]=s.get(e.label))}}let u=new Map;c.forEach((e,t)=>{e!==void 0&&u.set(t,e)});for(let e of a.nodes){let t=l(e.label),n=u.get(t);n!==void 0&&n!==s.get(e.label)&&(e.rep=n)}}else{let r=[],i=[],s=!1,c=(e,t)=>{e.length===0||e===t||r.push([e,t])};for(let e of t){let t=e.split(`=`),n=(t[0]??``).trim(),r=(t[1]??``).trim();if(!(!n||!r))if(n===`e`){let e=Y(r,o);c(e,``),c(X(e,o),``);let t=xe(e,o);t&&(i[t.g]=Math.max(i[t.g]??0,t.k))}else if(r===`e`){let e=Y(n,o);c(e,``),c(X(e,o),``);let t=xe(e,o);t&&(i[t.g]=Math.max(i[t.g]??0,t.k))}else{be(n,r,o)&&(s=!0);let e=Y(n,o),t=Y(r,o);e.length===t.length?c(e>t?e:t,e>t?t:e):c(e.length>=t.length?e:t,e.length>=t.length?t:e);let i=X(e,o),a=X(t,o);i.length===a.length?c(i>a?i:a,i>a?a:i):c(i.length>=a.length?i:a,i.length>=a.length?a:i)}}let l=e=>{let t=e;for(let e=0;e<200;e++){let e=!1;for(let[n,i]of r){if(n.length===0)continue;let r=t.indexOf(n);r>=0&&(t=t.slice(0,r)+i+t.slice(r+n.length),e=!0)}let n=ye(t,o);n!==t&&(t=n,e=!0);let a=Se(t,i,o);if(a!==t&&(t=a,e=!0),!e)break}return t},u=[];for(let t=0;t<e;t++)u.push(K[t]),u.push(`${K[t]}⁻¹`);let d=2*e,f=[{id:`e`,label:`e`,depth:0,x:0,y:0,z:0,dir:-1,parent:-1}],p=[],m=e=>o.map((t,n)=>{let r=J(e,n,`${t}⁻¹`),a=i[n];return a?(r%a+a)%a:r}).join(`,`),h=new Map([[`e`,0],[m(`e`),0]]),g=0;for(;g<f.length;){let e=f[g];if(g++,!(e.depth>=n))for(let t=0;t<d;t++){if(e.dir!==-1&&t===(e.dir%2==0?e.dir+1:e.dir-1))continue;let n=e.label===`e`?u[t]:e.label+u[t];if(s){let r=m(n);if(r===m(e.label)||h.has(r))continue;let i=f.length;f.push({id:`w${i}`,label:n,depth:e.depth+1,x:0,y:0,z:0,dir:t,parent:g-1}),h.set(r,i),p.push({from:g-1,to:i,d:t,isTree:!0})}else{let r=l(n)===``?`e`:l(n);if(r===e.label||h.has(r))continue;let i=f.length;f.push({id:`w${i}`,label:r,depth:e.depth+1,x:0,y:0,z:0,dir:t,parent:g-1}),h.set(r,i),p.push({from:g-1,to:i,d:t,isTree:!0})}}}if(s&&e===2){a.layout=`grid`;let e=[...f];for(let t of e)for(let e=0;e<d;e++){if(t.dir!==-1&&e===(t.dir%2==0?t.dir+1:t.dir-1))continue;let n=m(t.label===`e`?u[e]:t.label+u[e]);if(n===m(t.label))continue;let r=h.get(n);if(r===void 0)continue;let i=f.indexOf(t);p.push({from:i,to:r,d:e,isTree:!0})}}if(a.nodes=f,a.edges=p,a.isInfinite=!0,a.layout===`line`)for(let e of a.nodes)e.x=J(e.label,0,`a⁻¹`)*q,e.y=0,e.z=0;else if(a.layout===`grid`)for(let e of a.nodes)e.x=J(e.label,0,`a⁻¹`)*q,e.y=J(e.label,1,`b⁻¹`)*q,e.z=0;else if(a.layout===`tree`||a.layout===`tree3d`){let t=Array(f.length).fill(0);for(let e of p)t[e.from]++;let n=Math.max(...t,0)<=2?.7:.5,r=a.layout===`tree`?ge:_e;for(let t of a.nodes){if(t.label===`e`){t.x=0,t.y=0,t.z=0;continue}let i=0,a=0,s=0,c=0,l=0;for(;c<t.label.length;){let u=-1,d=!1;for(let n=0;n<e;n++){if(t.label.startsWith(`${o[n]}⁻¹`,c)){u=n,d=!0;break}if(t.label.startsWith(o[n],c)){u=n;break}}if(u<0){c++;continue}let f=u*2+ +!!d,p=me(l+1,n);i+=r[f].dx*p,a+=r[f].dy*p,s+=r[f].dz*p,c+=d?o[u].length+2:o[u].length,l++}t.x=i,t.y=a,t.z=s}}}for(let e of a.edges)a.nodes[e.to].rep!==void 0&&(e.isTree=!1);return a}var Z=c(),Q=[`#ff6b6b`,`#4ecdc4`,`#a78bfa`],we=`#ffd93d`,$=`#ffd93d`,Te=64,Ee=.02,De=8,Oe=e=>e===0?3.4:Math.max(.5,2.4-e*.2),ke=e=>e===0?12:Math.max(3,11-e*1.1),Ae=e=>Math.max(.5,1-e*.05);function je({tree:e,selectedWord:t,onSelect:n}){let r=(0,G.useMemo)(()=>{let t=0;for(let n of e.nodes){let e=Math.hypot(n.x,n.y,n.z);e>t&&(t=e)}return Math.max(100,t+60)},[e]),i=r*2.6,a=Math.max(1.2,r*.02);return(0,Z.jsxs)(w,{camera:{position:[i,i*.75,i*.9],fov:45},style:{width:`100%`,height:`100%`,background:`transparent`},children:[(0,Z.jsx)(`ambientLight`,{intensity:.75}),(0,Z.jsx)(`pointLight`,{position:[r*1.5,r*1.5,r*1.5],intensity:1.1}),(0,Z.jsx)(`pointLight`,{position:[-r,-r,-r],intensity:.4}),e.edges.map((t,n)=>{let r=e.nodes[t.from],i=e.nodes[t.to];return!t.isTree||r.rep!==void 0||i.rep!==void 0?null:(0,Z.jsx)(pe,{points:[[r.x,r.y,r.z],[i.x,i.y,i.z]],color:Q[t.d>>1]??`#888`,lineWidth:1.6,transparent:!0,opacity:.9},`e${n}`)}),e.nodes.map(e=>{if(e.rep!==void 0)return null;let r=t===e.label,i=e.depth===0?$:Q[e.dir>>1]??`#888`;return(0,Z.jsxs)(`mesh`,{position:[e.x,e.y,e.z],onClick:t=>{t.stopPropagation(),n(e.label)},children:[(0,Z.jsx)(`sphereGeometry`,{args:[r?a*1.5:a,14,14]}),(0,Z.jsx)(`meshStandardMaterial`,{color:i,emissive:r?we:`#000000`,emissiveIntensity:r?.6:0})]},e.id)}),(0,Z.jsx)(ee,{enableDamping:!1,minDistance:20,maxDistance:r*20})]})}function Me(){let{viewBoxSize:e,currentGroup:t,activePresentationGroup:s,templateGenCount:c,visualDraft:l}=i(),[u,d]=(0,G.useState)(De),[f,p]=(0,G.useState)({x:0,y:0}),[m,h]=(0,G.useState)(!1),[g,_]=(0,G.useState)(null),v=(0,G.useRef)(null),y=(0,G.useRef)(!1),b=(0,G.useMemo)(()=>{if(l){let e=l.group;return{generators:l.gens,relators:l.relators,generatorElements:e?e.generators.map(t=>t.apply(e.identity)):[]}}let e=s??t;if(!e)return null;if(e.presentation)return e.presentation;try{return n(e)}catch{return null}},[t,s,l]),x=b?b.generators.length:s??t?(s??t).generators.length:c,S=(0,G.useMemo)(()=>Math.min(8,Math.max(0,Math.round(Math.log2(u))+3)),[u]),C=(0,G.useMemo)(()=>{if(t||s||l){let e=b?b.relators:[],n=l?l.group??null:s??t??null,r=l?l.group?.order:(s??t)?.order,i=r===void 0?6:Math.min(14,Math.ceil(Math.log2(r+1))+3),a=r===void 0?e.length>0?S+1:S:i;return e.length===0?ve(x,a):Ce(x,e,a,n,b?.generatorElements)}return ve(c,S)},[t,s,l,c,S,b,x]),w=e.width,T=e.height,E=w/2,D=T/2,O=(0,G.useMemo)(()=>{let e=1/u;return{xMin:(-E-f.x)*e-400,xMax:(w-E-f.x)*e+400,yMin:(-D-f.y)*e-400,yMax:(T-D-f.y)*e+400}},[u,f,E,D,w,T]),k=e=>e.x>=O.xMin&&e.x<=O.xMax&&e.y>=O.yMin&&e.y<=O.yMax,ee=(0,G.useCallback)(e=>{e.stopPropagation();let t=e.deltaY<0?1.1:.9,n=Math.min(Te,Math.max(Ee,u*t));if(n===u)return;let r=e.currentTarget.getBoundingClientRect(),i={x:e.clientX-r.left,y:e.clientY-r.top},a={x:(i.x-(E+f.x))/u,y:(i.y-(D+f.y))/u};d(n),p({x:i.x-E-a.x*n,y:i.y-D-a.y*n})},[u,f,E,D]),te=(0,G.useCallback)(e=>{e.button===0&&(e.preventDefault(),e.stopPropagation(),v.current={startX:e.clientX,startY:e.clientY,panX:f.x,panY:f.y},h(!0))},[f]),ne=(0,G.useCallback)(e=>{v.current&&(e.preventDefault(),e.stopPropagation(),p({x:v.current.panX+(e.clientX-v.current.startX),y:v.current.panY+(e.clientY-v.current.startY)}))},[]),re=(0,G.useCallback)(e=>{if(!v.current)return;e.preventDefault(),e.stopPropagation();let t=e.clientX-v.current.startX,n=e.clientY-v.current.startY;y.current=Math.hypot(t,n)>3,v.current=null,h(!1)},[]),A=(0,G.useCallback)(()=>{v.current=null,h(!1)},[]),j=(0,G.useCallback)(e=>{e.preventDefault(),e.stopPropagation(),d(De),p({x:0,y:0})},[]),M=(0,G.useCallback)((e,t)=>{if(e.stopPropagation(),y.current){y.current=!1;return}_(e=>e===t?null:t)},[]),N=(0,G.useCallback)(()=>{if(y.current){y.current=!1;return}_(null)},[]),P=C.layout,F=(0,G.useMemo)(()=>C.edges.filter(e=>!e.isTree).length,[C]);return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`div`,{className:`relator-bar`,children:[(0,Z.jsx)(`span`,{className:`relator-bar-title`,children:(0,Z.jsx)(`span`,{dangerouslySetInnerHTML:{__html:(0,G.useMemo)(()=>o(r((t||l)&&b?a(b.generators,b.relators):`F(${[`a`,`b`,`c`].slice(0,x).join(`, `)}) = \\langle ${[`a`,`b`,`c`].slice(0,x).join(`, `)} \\mid \\rangle`)),[t,l,b,x])}})}),(0,Z.jsxs)(`span`,{className:`relator-gen`,children:[(0,Z.jsx)(`span`,{className:`relator-swatch`,style:{background:Q[0]}}),` a`,x>1&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(`span`,{className:`relator-swatch`,style:{background:Q[1],marginLeft:6}}),` b`]}),x>2&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(`span`,{className:`relator-swatch`,style:{background:Q[2],marginLeft:6}}),` c`]}),(0,Z.jsx)(`span`,{style:{marginLeft:8,color:`var(--text-muted)`},children:l?l.group?.order??`∞`:(s??t)?.order??`∞`}),(0,Z.jsxs)(`span`,{style:{marginLeft:8,color:we},children:[`粘合边 ×`,F]}),!(t||l)&&(0,Z.jsx)(`span`,{style:{marginLeft:8,color:`var(--text-muted)`},children:`模板树 · 去「群展示」面板创建`})]}),g&&(0,Z.jsxs)(`span`,{className:`relator-gen`,style:{color:$,fontWeight:600},children:[(0,Z.jsx)(`span`,{className:`relator-swatch`,style:{background:$}}),` `,g]})]}),P===`tree3d`?(0,Z.jsx)(`div`,{style:{position:`absolute`,inset:0},children:(0,Z.jsx)(je,{tree:C,selectedWord:g,onSelect:_})}):(0,Z.jsx)(`svg`,{viewBox:`0 0 ${w} ${T}`,className:`view-svg`,style:{userSelect:`none`,cursor:m?`grabbing`:`grab`},onWheel:ee,onMouseDown:te,onMouseMove:ne,onMouseUp:re,onMouseLeave:A,onDoubleClick:j,onClick:N,children:(0,Z.jsxs)(`g`,{transform:`translate(${E+f.x}, ${D+f.y}) scale(${u})`,children:[C.edges.map((e,t)=>{let n=C.nodes[e.from],r=C.nodes[e.to];return!e.isTree||n.rep!==void 0||r.rep!==void 0||!k(n)&&!k(r)?null:(0,Z.jsx)(`line`,{x1:n.x,y1:n.y,x2:r.x,y2:r.y,stroke:Q[e.d>>1]??`#888`,strokeWidth:Math.max(.15,(2-n.depth*.08)/u),opacity:Ae(n.depth)},`e${t}`)}),C.nodes.map(e=>{if(e.rep!==void 0||!k(e))return null;let t=g===e.label,n=e.depth===0?$:Q[e.dir>>1]??`#888`,r=Oe(e.depth)/u,i=ke(e.depth)/u;return(0,Z.jsxs)(`g`,{className:`ft-node${t?` selected`:``}`,transform:`translate(${e.x}, ${e.y})`,onClick:t=>M(t,e.label),children:[(0,Z.jsx)(`circle`,{r,fill:n,stroke:`#fff`,strokeWidth:.35/u}),(0,Z.jsx)(`circle`,{r:Math.max(r,4/u),fill:`transparent`}),(e.depth<=1||t)&&(0,Z.jsx)(`text`,{y:-r-i*.7,textAnchor:`middle`,fontSize:i,fontFamily:`serif`,fill:e.depth===0||t?$:`var(--text)`,fontWeight:e.depth===0||t?`bold`:`normal`,style:{userSelect:`none`,pointerEvents:`none`},children:e.label}),(0,Z.jsx)(`title`,{children:e.label})]},e.id)})]})})]})}export{Me as FreeGroupTreeView};