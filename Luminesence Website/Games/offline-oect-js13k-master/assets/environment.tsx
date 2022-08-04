<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE tileset SYSTEM "http://mapeditor.org/dtd/1.0/map.dtd">
<tileset name="js13k" tilewidth="32" tileheight="32" tilecount="5" columns="5">
 <image source="tileset.png" width="160" height="32"/>
 <tile id="0" type="sprite">
  <properties>
   <property name="isStable" type="bool" value="false"/>
   <property name="name" value="air"/>
  </properties>
 </tile>
 <tile id="1" type="sprite">
  <properties>
   <property name="isStable" type="bool" value="true"/>
   <property name="name" value="floor"/>
  </properties>
 </tile>
 <tile id="2" type="sprite">
  <properties>
   <property name="isStable" type="bool" value="true"/>
   <property name="name" value="ladder"/>
  </properties>
 </tile>
 <tile id="3">
  <properties>
   <property name="isStable" type="bool" value="false"/>
   <property name="name" value="door"/>
  </properties>
 </tile>
 <tile id="4">
  <properties>
   <property name="isStable" type="bool" value="false"/>
   <property name="name" value="player"/>
  </properties>
 </tile>
</tileset>
